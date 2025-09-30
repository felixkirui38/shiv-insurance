import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
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
      title: "Insurance Solutions for Your Most Valuable Assets",
      description: "At Shiv Insurance Brokers Ltd, we serve the insurance needs of our customers through detailed and thoughtful consultation. This leads to coverage at a cost that adds value to our relationship.",
      bgImage: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
      category: "Property Insurance"
    },
    {
      title: "Protecting Your Business & Personal Assets",
      description: "With nearly 3 decades of experience, we provide comprehensive insurance solutions across 34+ product categories tailored to your specific needs.",
      bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
      category: "Liability Coverage"
    },
    {
      title: "Comprehensive Health & Life Coverage",
      description: "Safeguard your family's future with our extensive health and life insurance products designed for peace of mind.",
      bgImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
      category: "Health & Life"
    },
    {
      title: "Professional Wealth Management Services",
      description: "Expert investment advisory and portfolio management to help you build and protect your financial future.",
      bgImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
      category: "Wealth Management"
    }
  ]

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef} data-testid="slider-container">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div 
                className="relative h-[500px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.bgImage})`
                }}
                data-testid={`slide-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/about">
                        <Button 
                          size="lg" 
                          className="bg-shiv-blue hover:bg-shiv-light-blue text-white px-8 py-3 text-base font-semibold uppercase tracking-wide"
                          data-testid="button-learn-more"
                        >
                          Learn More
                        </Button>
                      </Link>
                      <Link href="/services">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="border-2 border-white text-white hover:bg-white hover:text-shiv-blue px-8 py-3 text-base font-semibold uppercase tracking-wide"
                          data-testid="button-our-covers"
                        >
                          Our Covers
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        data-testid="button-prev-slide"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        data-testid="button-next-slide"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-shiv-accent scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            data-testid={`dot-indicator-${index}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {selectedIndex + 1} / {scrollSnaps.length}
      </div>
    </div>
  )
}