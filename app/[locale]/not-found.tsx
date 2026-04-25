// Localized 404 — uses GlassCard wrapper. Triggered by notFound() or unknown routes.
// Note: Next 16 + next-intl v4 — useTranslations works in this RSC because it runs
// inside the [locale] segment which is wrapped by NextIntlClientProvider.
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <GlassCard className="max-w-lg text-center" hover={false}>
        <h1 className="font-heading mb-4 text-4xl">{t('title')}</h1>
        <p className="mb-6 text-[var(--color-text-gray)]">{t('body')}</p>
        <Button
          render={
            <Link
              href="/"
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white"
            />
          }
        >
          {t('backHome')}
        </Button>
      </GlassCard>
    </main>
  )
}
