'use client'

import { useEffect, useState } from 'react'

export function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fadeTimer = window.setTimeout(() => setPhase('fading'), 3000)
    const doneTimer = window.setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 4800)
    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1A5A94] via-[#2B7FCC] to-[#4A9EE7] transition-opacity duration-700 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="orb orb-1" style={{ opacity: 0 }} />
      <div className="orb orb-2" style={{ opacity: 0 }} />

      <h1 className="splash-text font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
        Shakh Clinic
      </h1>
    </div>
  )
}
