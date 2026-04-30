import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  stagger?: number
  childSelector?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  stagger = 0,
  childSelector,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const fromX = direction === 'left' ? -30 : direction === 'right' ? 30 : 0
    const fromY = direction === 'up' ? 30 : direction === 'down' ? -30 : 0

    const targets = childSelector ? el.querySelectorAll(childSelector) : el

    const tween = gsap.from(targets, {
      x: fromX,
      y: fromY,
      opacity: 0,
      duration,
      delay,
      stagger: stagger || undefined,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [direction, delay, duration, stagger, childSelector, once])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
