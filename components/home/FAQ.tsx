'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const t = useTranslations('home.faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const faqData = { title: t('title'), items: t.raw('items') } as { title: string; items: { q: string; a: string }[] }
  
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12">{faqData.title}</h2>
      <div className="max-w-2xl mx-auto space-y-3">
        {faqData.items?.map((item, i) => (
          <GlassCard key={i} className="overflow-hidden">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-semibold pr-4">{item.q}</span>
              <ChevronDown className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="pr-5 mt-4 text-[var(--color-text-gray)]">{item.a}</div>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  )
}