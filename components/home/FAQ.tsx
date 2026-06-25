'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'

type FaqItem = { q: string; a: string }

function FaqRow({ item, isOpen, onToggle, delay }: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  delay: number
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="glass rounded-2xl overflow-hidden transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-semibold text-[var(--color-text-dark)] text-sm md:text-base">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[var(--color-primary)] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* CSS height transition uchun wrapper */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? (bodyRef.current?.scrollHeight ?? 500) + 'px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="px-6 pb-5 text-[var(--color-text-gray)] text-sm leading-relaxed">
          {item.a}
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const t = useTranslations('home.faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqData = {
    title: t('title'),
    items: t.raw('items') as FaqItem[],
  }

  return (
    <section className="py-16 container mx-auto px-6">
      <SectionHeading title={faqData.title} />

      <div className="max-w-2xl mx-auto space-y-3">
        {faqData.items?.map((item, i) => (
          <FaqRow
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            delay={(i % 4) * 60}
          />
        ))}
      </div>
    </section>
  )
}