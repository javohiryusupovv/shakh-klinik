'use client'

import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'

export function AboutSection() {
  const t = useTranslations('home.about')

  return (
    <section className="py-16 container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-heading mb-6">{t('heading')}</h2>
        <GlassCard className="p-8">
          <p className="text-lg text-[var(--color-text-dark)] leading-relaxed">
            {t('body')}
          </p>
        </GlassCard>
      </div>
    </section>
  )
}