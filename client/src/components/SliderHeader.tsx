import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { companyData } from '@/lib/data'

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

  const slides = companyData.services.map((service, index) => ({
    title: service.category,
    description: `Comprehensive ${service.category.toLowerCase()} solutions for individuals and businesses. Protecting what matters most to you.`,
    products: service.products,
    bgImage: `https://images.unsplash.com/photo-${1560472354 + index * 1000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800`,
    color: service.color
  }))

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef} data-testid="slider-container">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div 
                className="relative h-[600px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(41, 44, 141, 0.8), rgba(212, 102, 107, 0.6)), url(${slide.bgImage})`
                }}
                data-testid={`slide-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-shiv-accent text-white text-sm font-semibold rounded-full mb-4">
                        Insurance Category
                      </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                      {slide.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-shiv-accent">Our Products Include:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {slide.products.slice(0, 4).map((product, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-shiv-accent rounded-full"></div>
                            <span className="text-gray-200">{product}</span>
                          </div>
                        ))}
                      </div>
                      {slide.products.length > 4 && (
                        <div className="mt-2 text-shiv-accent text-sm">
                          +{slide.products.length - 4} more products
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-shiv-accent hover:bg-shiv-accent-light text-white px-8 py-3 text-lg"
                        data-testid="button-get-quote"
                      >
                        Get a Quote
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white text-white hover:bg-white hover:text-shiv-blue px-8 py-3 text-lg"
                        data-testid="button-learn-more"
                      >
                        Learn More
                      </Button>
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