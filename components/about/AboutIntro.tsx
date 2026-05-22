'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/shared/Reveal'
import ShakhGlobalImg from "../../public/_clinic_original/ShakhGlob.jpg"

type Highlight = { value: string; label: string }

export function AboutIntro() {
  const t = useTranslations('about.intro')
  const paragraphs = t.raw('paragraphs') as string[]
  const highlights = t.raw('highlights') as Highlight[]

  return (
    <section className="container mx-auto px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal direction="right">
          <p className="text-[var(--color-primary)] font-semibold mb-3">{t('subtitle')}</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[var(--color-text-dark)] leading-tight">
            {t('heading')}
          </h1>
          <div className="space-y-4 text-lg text-[var(--color-text-gray)] leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
            {highlights.map((h, i) => (
              <div key={i}>
                <div className="text-3xl font-heading font-bold text-[var(--color-primary)]">{h.value}</div>
                <div className="text-sm text-[var(--color-text-gray)] mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="left" delay={100}>
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={ShakhGlobalImg}
              alt={t('heading')}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
