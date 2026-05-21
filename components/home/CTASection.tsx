'use client'

import { useTranslations } from 'next-intl'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
  const t = useTranslations('home.cta')

  return (
    <section className="py-24 bg-gradient-to-r from-[#4A9EE7] via-[#5BB0F0] to-[#2B7FCC] relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative text-center">
        <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
          {t('heading')}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          {t('body')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BookCTAButton className="text-lg px-10 py-5" />
          <a 
            href="tel:+998901234567"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/30 transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>+998 90 123-45-67</span>
          </a>
        </div>
      </div>
    </section>
  )
}