'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  DENTAL_SERVICES,
  formatDentalPrice,
  DENTAL_CATEGORIES,
  type Locale,
} from '@/lib/data/dental-services'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FEATURED_SERVICE_IDS } from '@/lib/data/site-data'
import { ArrowRight } from 'lucide-react'

// Category visual tokens
const CAT_STYLE: Record<string, { emoji: string; accent: string; light: string }> = {
  therapy:      { emoji: '🦷', accent: '#2B7FCC', light: '#EBF5FF' },
  orthopedics:  { emoji: '👑', accent: '#7B5EE7', light: '#F3F0FF' },
  surgery:      { emoji: '🔬', accent: '#E74A7B', light: '#FFF0F5' },
  orthodontics: { emoji: '✨', accent: '#28A85E', light: '#EDFAF4' },
}

function categoryName(categoryId: string, locale: Locale): string {
  return DENTAL_CATEGORIES.find((c) => c.id === categoryId)?.name[locale] ?? ''
}

export function PopularServices() {
  const locale = useLocale() as Locale
  const tSection = useTranslations('home.popularServices')

  const services = [...FEATURED_SERVICE_IDS]
    .map((id) => DENTAL_SERVICES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading
          badge={tSection('badge')}
          title={tSection('heading')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const cat = CAT_STYLE[service.category] ?? { emoji: '•', accent: '#2B7FCC', light: '#EBF5FF' }
            const isFree = service.price === 'free'
            return (
              <Link
                key={service.id}
                href="/services"
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 70}
                className="block group"
              >
                <div
                  className="rounded-2xl bg-white h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                  style={{
                    border: `1.5px solid ${cat.accent}1A`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Colored header band */}
                  <div
                    className="px-5 py-4 flex items-center gap-3"
                    style={{ background: cat.light }}
                  >
                    <span className="text-2xl leading-none">{cat.emoji}</span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider truncate"
                      style={{ color: cat.accent }}
                    >
                      {categoryName(service.category, locale)}
                    </span>
                  </div>

                  {/* Service name */}
                  <div className="px-5 py-4 flex-1">
                    <h3
                      className="font-semibold text-sm leading-snug text-[#1F2937] line-clamp-3"
                    >
                      {service.name[locale]}
                    </h3>
                  </div>

                  {/* Price footer */}
                  <div
                    className="px-5 py-3.5 flex items-center justify-between border-t"
                    style={{ borderColor: `${cat.accent}18` }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: isFree ? '#059669' : cat.accent }}
                    >
                      {isFree
                        ? (locale === 'ru' ? 'Бесплатно' : locale === 'uz' ? 'Bepul' : 'Free')
                        : formatDentalPrice(service, locale)
                      }
                    </span>
                    <ArrowRight
                      className="w-4 h-4 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: cat.accent }}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#4A9EE7 0%,#1A5A94 100%)' }}
          >
            {tSection('allServicesCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
