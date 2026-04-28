'use client'

// Scroll-to-top button — appears after 600px scroll, smooth-scrolls to top.
// Sits below the FloatingCTA stack visually (FloatingCTA at bottom-4/6,
// this one at bottom-44 to clear the 3 stacked CTAs on mobile).
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed right-4 max-sm:bottom-52 sm:bottom-44 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary-deep)] shadow-lg ring-1 ring-[var(--color-primary)]/20 transition-transform hover:scale-110 hover:bg-white md:right-6 md:bottom-48"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
