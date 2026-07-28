import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { companyData } from "@/lib/data";

type SliderTestimonial = {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  highlight?: string;
};

async function fetchPublishedTestimonials(): Promise<SliderTestimonial[]> {
  const res = await fetch("/api/content/testimonials");
  if (!res.ok) throw new Error("Failed to load testimonials");
  const data = await res.json();
  const list = (data.testimonials ?? []) as Array<{
    id: string;
    name: string;
    company: string;
    content: string;
    rating: number;
    published: boolean;
  }>;
  return list.map((t) => ({
    id: t.id,
    name: t.name,
    company: t.company,
    content: t.content,
    rating: t.rating ?? 5,
  }));
}

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
  const { data: cmsTestimonials = [], isLoading } = useQuery({
    queryKey: ["/api/content/testimonials"],
    queryFn: fetchPublishedTestimonials,
  });

  const fallbackTestimonials: SliderTestimonial[] = useMemo(
    () =>
      companyData.testimonials.map((t, index) => ({
        id: `fallback-${index}`,
        name: t.name,
        company: t.company,
        content: t.content,
        rating: t.rating,
        highlight: "highlight" in t ? t.highlight : undefined,
      })),
    [],
  );

  const testimonials =
    cmsTestimonials.length > 0 ? cmsTestimonials : fallbackTestimonials;

  const averageRating = useMemo(() => {
    if (!testimonials.length) return "4.9";
    const avg =
      testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length;
    return avg.toFixed(1);
  }, [testimonials]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 7000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
                  <span className="testimonial-rating-score">{averageRating}</span>
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
                  disabled={testimonials.length < 2}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="testimonial-nav-btn"
                  aria-label="Next testimonial"
                  disabled={testimonials.length < 2}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[280px] p-8 md:min-h-[320px] md:p-10">
              {isLoading && cmsTestimonials.length === 0 ? (
                <p className="text-white/60">Loading testimonials…</p>
              ) : (
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {testimonials.map((item) => (
                      <blockquote
                        key={item.id}
                        className="min-w-0 shrink-0 grow-0 basis-full"
                      >
                        <TestimonialQuote
                          content={item.content}
                          highlight={item.highlight}
                        />
                        <footer className="mt-8">
                          <div>
                            <p className="text-sm font-bold uppercase tracking-[0.12em] text-shiv-gold">
                              @{item.name}
                            </p>
                            {item.company ? (
                              <p className="mt-1 text-sm text-white/55">{item.company}</p>
                            ) : null}
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
