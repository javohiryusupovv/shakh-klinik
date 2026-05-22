'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/shared/Reveal'
import { GlassCard } from '@/components/shared/GlassCard'
import {
  Armchair,
  Microscope,
  ShieldCheck,
  Car,
  Baby,
  Accessibility,
  type LucideIcon,
} from 'lucide-react'

const ICONS: LucideIcon[] = [Armchair, Microscope, ShieldCheck, Car, Baby, Accessibility]

type FacilityItem = { title: string; description: string }

export function Facilities() {
  const t = useTranslations('about.facilities')
  const items = t.raw('items') as FacilityItem[]

  return (
    <section className="bg-[var(--color-bg-lightest)] py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-[var(--color-text-dark)]">
            {t('heading')}
          </h2>
          <p className="text-lg text-[var(--color-text-gray)]">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? ICONS[0]
            return (
              <Reveal key={i} delay={i * 80}>
                <GlassCard className="p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-deep)] flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2 text-[var(--color-text-dark)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-gray)] leading-relaxed">{item.description}</p>
                </GlassCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
