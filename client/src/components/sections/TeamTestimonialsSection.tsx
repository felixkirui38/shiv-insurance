import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { companyData } from "@/lib/data";

type Testimonial = (typeof companyData.testimonials)[number];

function TestimonialQuote({
  content,
  highlight,
}: {
  content: string;
  highlight?: string;
}) {
  if (!highlight || !content.includes(highlight)) {
    return <p className="testimonial-quote-text">{content}</p>;
  }

  const [before, after] = content.split(highlight);
  return (
    <p className="testimonial-quote-text">
      {before}
      <span className="underline decoration-white/70 underline-offset-[6px]">
        {highlight}
      </span>
      {after}
    </p>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 48 48" aria-hidden>
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3.5"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="var(--shiv-gold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {percent}%
      </span>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">Brokers Who Know the Business</h2>
          <p className="mt-4 section-subheading max-w-2xl mx-auto">
            Licensed professionals with decades of insurance expertise — guiding every policy we place and every claim we handle.
          </p>
        </div>

        <div className="flex justify-center">
          {companyData.team.map((member) => (
            <article key={member.name} className="theme-card overflow-hidden text-center group w-full max-w-lg">
              <div className="h-80 sm:h-96 bg-shiv-cream-warm flex items-center justify-center p-4 sm:p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-shiv-text">{member.name}</h3>
                <p className="text-shiv-gold font-semibold text-sm mt-1">{member.position}</p>
                <p className="text-sm text-shiv-text-muted mt-2">{member.qualification}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = companyData.testimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 7000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const slidePercent = Math.round(((selectedIndex + 1) / testimonials.length) * 100);

  return (
    <section className="site-section site-section-cream-warm">
      <div className="site-container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="section-heading">Real Clients. Real Claims. Real Results.</h2>
          <p className="mt-4 section-subheading max-w-2xl mx-auto">
            From factory floors to family cars — hear why businesses and individuals across Kenya trust Shiv with their cover.
          </p>
        </div>

        <div className="testimonial-showcase-panel overflow-hidden rounded-[var(--radius-card)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,320px)_1fr]">
            <div className="flex flex-col justify-between gap-10 border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="testimonial-rating-score">4.9</span>
                  <div className="testimonial-satisfaction-badge">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-shiv-navy-deep text-shiv-navy-deep"
                        />
                      ))}
                    </div>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                      Customer Satisfaction
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="testimonial-nav-btn"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="testimonial-nav-btn"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[280px] p-8 md:min-h-[320px] md:p-10">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {testimonials.map((item: Testimonial) => (
                    <blockquote
                      key={item.name}
                      className="min-w-0 shrink-0 grow-0 basis-full"
                    >
                      <TestimonialQuote
                        content={item.content}
                        highlight={"highlight" in item ? item.highlight : undefined}
                      />
                      <footer className="mt-8 flex items-end justify-between gap-6 pr-16 sm:pr-20">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.12em] text-shiv-gold">
                            @{item.name}
                          </p>
                          <p className="mt-1 text-sm text-white/55">{item.company}</p>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-8 right-8 md:bottom-10 md:right-10"
                aria-hidden
              >
                <ProgressRing percent={slidePercent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
