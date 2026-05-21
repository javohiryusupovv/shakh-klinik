'use client'

// Scroll-to-top button — appears after 600px scroll, smooth-scrolls to top.
// Circular border fills with brand blue as the user scrolls down, empties
// as they scroll back up. Sits below the FloatingCTA stack visually.
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SIZE = 48
const STROKE = 2.5
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      setProgress(pct)
      setVisible(scrollTop > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!visible) return null

  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="group fixed right-4 max-sm:bottom-52 sm:bottom-44 z-40 flex items-center justify-center rounded-full bg-white/90 text-[var(--color-primary-deep)] transition-transform hover:scale-110 hover:bg-white md:right-6 md:bottom-48"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={SIZE}
        height={SIZE}
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#4a9ee7"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" />
    </button>
  )
}
