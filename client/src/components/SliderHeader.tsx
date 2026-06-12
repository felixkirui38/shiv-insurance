import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'wouter'

export function SliderHeader() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((api: { scrollSnapList: () => number[] }) => {
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = useCallback((api: { selectedScrollSnap: () => number }) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  const slides = [
    {
      title: 'Reliable Coverage. Real Peace of Mind.',
      description:
        'Life is full of risk — we help you manage it. Shiv Insurance compares policies from top Kenyan insurers to find cover that fits your life, business, and budget.',
      bgImage:
        'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Kenya\'s Trusted Broker',
    },
    {
      title: 'Protect What You\'ve Worked Hard to Build',
      description:
        'From property and fleet to liability and WIBA — we structure commercial insurance that keeps your operations running when the unexpected strikes.',
      bgImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Business Insurance',
    },
    {
      title: 'Health & Life Cover for the People Who Matter',
      description:
        'Medical, life, and pension plans for families and employers — because the best investment is knowing your loved ones and staff are protected.',
      bgImage:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Health & Life',
    },
    {
      title: 'When Disaster Strikes, Your Policy Should Respond',
      description:
        'Motor comprehensive, fire & perils, all-risks, and personal accident — fast quotes, clear terms, and a broker on your side through every claim.',
      bgImage:
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Personal Cover',
    },
  ]

  const activeSlide = slides[selectedIndex]

  return (
    <div className="relative" data-testid="slider-container">
      <div className="flex flex-col lg:flex-row min-h-[22rem] sm:min-h-[28rem] lg:min-h-[36rem]">
        <div className="hero-panel flex flex-col justify-center w-full lg:w-[42%] px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 order-2 lg:order-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-shiv-navy-deep/70 mb-4">
            {activeSlide.category}
          </span>
          <h1
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-shiv-navy-deep mb-5 transition-opacity duration-300"
            data-testid="hero-heading"
          >
            {activeSlide.title}
          </h1>
          <p className="text-base md:text-lg text-shiv-navy-deep/85 leading-relaxed mb-8 max-w-2xl">
            {activeSlide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-cta-navy" data-testid="button-learn-more">
              Get a Free Quote
            </Link>
            <Link href="/services" className="btn-cta-outline-dark" data-testid="button-our-covers">
              Explore Our Covers
            </Link>
          </div>
        </div>

        <div className="relative w-full lg:w-[58%] min-h-[18rem] sm:min-h-[22rem] lg:min-h-0 order-1 lg:order-2">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 relative h-full min-h-[18rem] sm:min-h-[22rem] lg:min-h-[36rem]"
                  data-testid={`slide-${index}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.bgImage})` }}
                    role="img"
                    aria-label={slide.category}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-shiv-navy/50 hover:bg-shiv-navy text-white p-2.5 rounded-full transition-colors"
            data-testid="button-prev-slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-shiv-navy/50 hover:bg-shiv-navy text-white p-2.5 rounded-full transition-colors"
            data-testid="button-next-slide"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-shiv-gold'
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
                data-testid={`dot-indicator-${index}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 z-20 bg-shiv-navy/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {selectedIndex + 1} / {scrollSnaps.length}
          </div>
        </div>
      </div>

      <div className="sub-hero-bar">
        <div className="site-container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm font-medium">
            <span>Licensed by IRA</span>
            <span className="text-shiv-gold font-semibold">Independent brokers — we work for you, not the insurer</span>
            <span>Member of AIBK</span>
          </div>
        </div>
      </div>
    </div>
  )
}
