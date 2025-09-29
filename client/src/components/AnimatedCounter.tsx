import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ target, duration = 2000, suffix = '', className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const increment = target / (duration / 16) // 60fps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return (
    <div ref={ref} className={className} data-testid="animated-counter">
      {count}{suffix}
    </div>
  )
}