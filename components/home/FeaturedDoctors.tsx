'use client'

import { useTranslations } from 'next-intl'
import { getFeaturedDoctors } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'

export function FeaturedDoctors() {
  const tDoctors = useTranslations('doctors')
  const doctors = getFeaturedDoctors(6)
  
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12">Наши специалисты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <a key={doctor.slug} href={`/doctors/${doctor.slug}`}>
            <GlassCard className="p-5 hover:scale-105 transition-transform cursor-pointer text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-mint)]/20 flex items-center justify-center text-4xl">
                👨‍⚕️
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {tDoctors(`${doctor.slug}.name`)}
              </h3>
              <p className="text-[var(--color-mint)] text-sm">
                {tDoctors(`${doctor.slug}.specialty`)}
              </p>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  )
}