'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { DOCTORS } from '@/lib/data/content'
import { GlassCard } from '@/components/shared/GlassCard'

export default function DoctorsPage() {
  const t = useTranslations('doctors')
  const tPage = useTranslations('pages.doctors')
  const tCommon = useTranslations('common')
  const [selectedDept, setSelectedDept] = useState<string>('all')

  const filtered = selectedDept === 'all'
    ? DOCTORS
    : DOCTORS.filter(d => d.departmentId === selectedDept)

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8" data-aos="fade-up">{tPage('title')}</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedDept('all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedDept === 'all'
              ? 'bg-[var(--color-primary)] text-white'
              : 'glass hover:bg-[var(--color-primary)]/10'
          }`}
        >
          {tCommon('allFilter')}
        </button>
        {[...new Set(DOCTORS.map(d => d.departmentId))].map(dept => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedDept === dept
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass hover:bg-[var(--color-primary)]/10'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doctor, i) => (
          <Link
            key={doctor.slug}
            href={`/doctors/${doctor.slug}`}
            data-aos="fade-up"
            data-aos-delay={(i % 6) * 80}
          >
            <GlassCard hover={false} className="p-6 cursor-pointer text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={doctor.photo}
                  alt={t(`${doctor.slug}.name`)}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{t(`${doctor.slug}.name`)}</h3>
              <p className="text-[var(--color-mint)] mb-2">{t(`${doctor.slug}.specialty`)}</p>
              <p className="text-sm text-[var(--color-text-gray)]">{doctor.experienceYears} {tPage('experienceSuffix')}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
