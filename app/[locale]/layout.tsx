import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'

// D-11: Lock all 3 locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// D-10: params is a Promise in Next 16 — must await (PITFALLS §2)
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale — redirects to 404 for unknown locales (T-01-01)
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  // getMessages() reads from i18n/request.ts via next-intl RSC integration
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Phase 1 Header stub — minimal, replaced in Phase 2 (D-21) */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <LanguageSwitcher />
      </header>
      <main>{children}</main>
    </NextIntlClientProvider>
  )
}
