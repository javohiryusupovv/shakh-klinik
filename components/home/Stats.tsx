'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import {
  Users2,
  CalendarCheck,
  Stethoscope,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { STATS_ICONS_META } from '@/lib/data/site-data'

// iconKey string → haqiqiy Lucide component
const ICON_MAP: Record<string, LucideIcon> = {
  Users2,
  CalendarCheck,
  Stethoscope,
  UserCheck,
}

type Stat = { value: number; suffix: string; label: string }

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 1800
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  const t = useTranslations('home.stats')
  const stats = t.raw('items') as Stat[]

  return (
    <section className="py-16 bg-gradient-to-r from-[var(--color-primary)]/8 via-white/60 to-[var(--color-mint)]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const meta = STATS_ICONS_META[i]
            const Icon = meta ? ICON_MAP[meta.iconKey] : null

            return (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-center group"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {/* Icon */}
                {Icon && (
                  <div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: meta.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: meta.accentColor }} />
                  </div>
                )}

                {/* Animatsion son */}
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: meta?.accentColor ?? 'var(--color-primary)' }}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-sm text-[var(--color-text-gray)] font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}