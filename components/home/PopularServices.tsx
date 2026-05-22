'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  DENTAL_SERVICES,
  formatDentalPrice,
  DENTAL_CATEGORIES,
  type Locale,
} from '@/lib/data/dental-services'
import { GlassCard } from '@/components/shared/GlassCard'

function categoryName(categoryId: string, locale: Locale): string {
  return DENTAL_CATEGORIES.find((c) => c.id === categoryId)?.name[locale] ?? ''
}

export function PopularServices() {
  const locale = useLocale() as Locale
  const tSection = useTranslations('home.popularServices')
  // A representative mix of popular dental services.
  const featuredIds = ['t4', 't5', 'p109', 'p112', 's210', 's229', 'o307', 'o273']
  const services = featuredIds
    .map((id) => DENTAL_SERVICES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12" data-aos="fade-up">
        {tSection('heading')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <Link
            key={service.id}
            href="/services"
            data-aos="fade-up"
            data-aos-delay={(i % 4) * 80}
          >
            <GlassCard hover={false} className="p-5 cursor-pointer h-full flex flex-col">
              <p className="text-xs text-[var(--color-mint)] mb-1">
                {categoryName(service.category, locale)}
              </p>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{service.name[locale]}</h3>
              <p className="text-[var(--color-primary)] font-semibold mt-auto">
                {formatDentalPrice(service, locale)}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}
