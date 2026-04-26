'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/shared/GlassCard'

const stats = [
  { value: 15000, suffix: '+', label: 'Пациентов' },
  { value: 15, suffix: ' лет', label: 'Опыта' },
  { value: 28, suffix: '+', label: 'Услуг' },
  { value: 15, suffix: '', label: 'Врачей' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
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
  }, [value])
  
  return <span>{count.toLocaleString()}{suffix}</span>
}

export function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-mint)]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[var(--color-text-gray)]">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}