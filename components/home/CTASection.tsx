'use client'

import { useTranslations } from 'next-intl'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { Phone, CheckCircle2 } from 'lucide-react'
import { CLINIC } from '@/lib/data/site-data'

const TRUST_POINTS_KEY = ['trustPoint1', 'trustPoint2', 'trustPoint3'] as const

export function CTASection() {
  const t = useTranslations('home.cta')

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A5A94] via-[#2B7FCC] to-[#4A9EE7]" />

      {/* Dekorativ orb'lar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 bg-[#A8E6CF]/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6"
            data-aos="fade-down"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF] animate-pulse" />
            {t('badge')}
          </div>

          {/* Sarlavha */}
          <h2
            className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4"
            data-aos="fade-up"
          >
            {t('heading')}
          </h2>

          <p
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            {t('body')}
          </p>

          {/* Tugmalar */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            data-aos="fade-up"
            data-aos-delay="140"
          >
            <BookCTAButton className="text-base px-8 py-4" />
            <a
              href={`tel:${CLINIC.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border border-white/25 text-white rounded-full text-base font-semibold hover:bg-white/25 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>{CLINIC.phone}</span>
            </a>
          </div>

          {/* Trust nuqtalari */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {TRUST_POINTS_KEY.map((key) => (
              <div key={key} className="flex items-center gap-1.5 text-white/70 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
