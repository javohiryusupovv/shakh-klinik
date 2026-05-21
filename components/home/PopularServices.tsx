'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getPopularServices } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'

function formatPrice(min: number, max: number): string {
  return `${min.toLocaleString()} – ${max.toLocaleString()} UZS`
}

export function PopularServices() {
  const tServices = useTranslations('services')
  const tSection = useTranslations('home.popularServices')
  const tPages = useTranslations('pages.services')
  const services = getPopularServices(8)

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12" data-aos="fade-up">{tSection('heading')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            data-aos="fade-up"
            data-aos-delay={(i % 4) * 80}
          >
            <GlassCard hover={false} className="p-5 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">
                {tServices(`${service.slug}.name`)}
              </h3>
              <p className="text-[var(--color-text-gray)] text-sm mb-2">
                {formatPrice(service.priceMin, service.priceMax)}
              </p>
              <p className="text-sm text-[var(--color-mint)]">{service.durationMinutes} {tPages('minutesShort')}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}