import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'

// Home placeholder — Phase 2 demo using GlassCard primitive on the
// gradient background so the design system is visually verifiable.
// Phase 4 replaces with real Hero/Services/Doctors/News/Reviews/CTA sections.
export default function HomePage() {
  const t = useTranslations('home')
  return (
    <section className="container mx-auto space-y-8 p-6 py-20">
      <GlassCard className="text-center">
        <h1 className="font-heading mb-4 text-5xl md:text-6xl">
          Shax<span className="text-[var(--color-mint)]">Klinika</span>
        </h1>
        <p className="text-lg text-[var(--color-text-dark)]">{t('placeholder')}</p>
        <p className="mt-2 text-sm text-[var(--color-text-gray)]">
          Phase 2 design system live — full content coming in Phase 4
        </p>
      </GlassCard>
    </section>
  )
}
