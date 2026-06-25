'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getFeaturedDoctors } from '@/lib/services'
import { DoctorCard } from '@/components/shared/DoctorCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArrowRight } from 'lucide-react'

export function FeaturedDoctors() {
  const tDoctors = useTranslations('doctors')
  const tSection = useTranslations('home.featuredDoctors')
  const doctors = getFeaturedDoctors(6)

  return (
    <section className="py-16 bg-gradient-to-b from-[#f0f7ff] to-white">
      <div className="container mx-auto px-6">
        <SectionHeading
          badge={tSection('badge')}
          title={tSection('heading')}
          subtitle={tSection('subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((doctor, i) => (
            <DoctorCard
              key={doctor.slug}
              slug={doctor.slug}
              photo={doctor.photo}
              name={tDoctors(`${doctor.slug}.name`)}
              specialty={tDoctors(`${doctor.slug}.specialty`)}
              experienceYears={doctor.experienceYears}
              experienceLabel={tDoctors('experienceLabel')}
              delay={(i % 3) * 100}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#4A9EE7 0%,#1A5A94 100%)' }}
          >
            {tSection('allDoctorsCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
