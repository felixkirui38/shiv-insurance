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
      title: 'Insurance Solutions for Your Most Valuable Assets',
      description:
        'At Shiv Insurance Brokers Ltd, we serve the insurance needs of our customers through detailed and thoughtful consultation. This leads to coverage at a cost that adds value to our relationship.',
      bgImage:
        'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Property Insurance',
    },
    {
      title: 'Protecting Your Business & Personal Assets',
      description:
        'With nearly 3 decades of experience, we provide comprehensive insurance solutions across 34+ product categories tailored to your specific needs.',
      bgImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Liability Coverage',
    },
    {
      title: 'Comprehensive Health & Life Coverage',
      description:
        "Safeguard your family's future with our extensive health and life insurance products designed for peace of mind.",
      bgImage:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Health & Life',
    },
    {
      title: 'Professional Wealth Management Services',
      description:
        'Expert investment advisory and portfolio management to help you build and protect your financial future.',
      bgImage:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800',
      category: 'Wealth Management',
    },
  ]

  const activeSlide = slides[selectedIndex]

  return (
    <div className="relative" data-testid="slider-container">
      <div className="flex flex-col lg:flex-row min-h-[32rem] lg:min-h-[36rem]">
        <div className="hero-panel flex flex-col justify-center w-full lg:w-[42%] px-8 py-12 lg:px-14 lg:py-16 order-2 lg:order-1">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4">
            {activeSlide.category}
          </span>
          <h1
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-white mb-5 transition-opacity duration-300"
            data-testid="hero-heading"
          >
            {activeSlide.title}
          </h1>
          <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
            {activeSlide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about" className="btn-cta-navy" data-testid="button-learn-more">
              Learn More
            </Link>
            <Link href="/services" className="btn-cta-outline-dark border-white/40 text-white hover:bg-white/10" data-testid="button-our-covers">
              Our Covers
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
                    ? 'w-8 bg-white'
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
            <span>Member of AIBK</span>
          </div>
        </div>
      </div>
    </div>
  )
}
