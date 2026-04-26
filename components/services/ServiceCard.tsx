'use client'

import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import type { Service } from '@/lib/data/content'

interface ServiceCardProps {
  service: Service
}

function formatPrice(min: number, max: number): string {
  return `${min.toLocaleString()} – ${max.toLocaleString()} UZS`
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services')
  
  return (
    <a href={`/services/${service.slug}`}>
      <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer h-full">
        <h3 className="text-xl font-semibold mb-2">
          {t(`${service.slug}.name`)}
        </h3>
        <p className="text-[var(--color-text-gray)] text-sm mb-3 line-clamp-2">
          {t(`${service.slug}.description`).slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-[var(--color-primary)] font-semibold">
            {formatPrice(service.priceMin, service.priceMax)}
          </span>
          <span className="text-sm text-[var(--color-mint)]">
            {service.durationMinutes} мин
          </span>
        </div>
      </GlassCard>
    </a>
  )
}