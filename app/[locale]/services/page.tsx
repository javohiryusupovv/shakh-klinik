'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  DENTAL_CATEGORIES,
  getDentalServicesByCategory,
  formatDentalPrice,
  type Locale,
} from '@/lib/data/dental-services'
import { GlassCard } from '@/components/shared/GlassCard'

export default function ServicesPage() {
  const locale = useLocale() as Locale
  const tPages = useTranslations('pages.services')
  const [selected, setSelected] = useState<string>('all')

  const categories =
    selected === 'all'
      ? DENTAL_CATEGORIES
      : DENTAL_CATEGORIES.filter((c) => c.id === selected)

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="text-center mb-10" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-heading mb-4">{tPages('title')}</h1>
        <p className="text-[var(--color-text-gray)] text-lg max-w-2xl mx-auto">
          {tPages('subtitle')}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setSelected('all')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            selected === 'all'
              ? 'bg-[#4A9EE7] text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {tPages('allCategories')}
        </button>
        {DENTAL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selected === cat.id
                ? 'bg-[#4A9EE7] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat.name[locale]}
          </button>
        ))}
      </div>

      {/* Price list grouped by category */}
      <div className="space-y-10 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const services = getDentalServicesByCategory(cat.id)
          return (
            <section key={cat.id} data-aos="fade-up">
              <h2 className="text-2xl font-heading font-semibold mb-4 text-[var(--color-text-dark)]">
                {cat.name[locale]}
              </h2>
              <GlassCard hover={false} className="p-2 sm:p-4">
                <ul className="divide-y divide-[var(--color-primary)]/10">
                  {services.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-baseline justify-between gap-4 px-3 py-3"
                    >
                      <span className="text-[var(--color-text-dark)]">{s.name[locale]}</span>
                      <span className="text-[var(--color-primary)] font-semibold whitespace-nowrap">
                        {formatDentalPrice(s, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </section>
          )
        })}
      </div>
    </main>
  )
}
