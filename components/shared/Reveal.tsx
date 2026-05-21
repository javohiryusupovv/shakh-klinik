'use client'

import { useRef, ReactNode } from 'react'
import { useInView } from 'motion/react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  distance?: number
  duration?: number
  once?: boolean
}

function startTransform(direction: Direction, distance: number): string {
  switch (direction) {
    case 'up':    return `translateY(${distance}px)`
    case 'down':  return `translateY(-${distance}px)`
    case 'left':  return `translateX(${distance}px)`
    case 'right': return `translateX(-${distance}px)`
    case 'fade':  return 'none'
  }
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 600,
  once = true,
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0,0)' : startTransform(direction, distance),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}