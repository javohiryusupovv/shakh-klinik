'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getFeaturedDoctors } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'
import TestImg from "../../public/testImg.jpg"

export function FeaturedDoctors() {
  const tDoctors = useTranslations('doctors')
  const tSection = useTranslations('home.featuredDoctors')
  const doctors = getFeaturedDoctors(6)

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12" data-aos="fade-up">{tSection('heading')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, i) => (
          <Link
            key={doctor.slug}
            href={`/doctors/${doctor.slug}`}
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 100}
          >
            <GlassCard hover={false} className="p-5 cursor-pointer text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={TestImg}
                  alt={tDoctors(`${doctor.slug}.name`)}
                  fill
                  sizes="96px"
                  className="object-cover object-top scale-125"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {tDoctors(`${doctor.slug}.name`)}
              </h3>
              <p className="text-[var(--color-mint)] text-sm">
                {tDoctors(`${doctor.slug}.specialty`)}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}