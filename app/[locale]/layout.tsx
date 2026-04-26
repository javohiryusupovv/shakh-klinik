import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AppointmentModalProvider } from '@/components/shared/AppointmentModalProvider'
import { FloatingCTA } from '@/components/shared/FloatingCTA'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

// D-11: Lock all 3 locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Animated background orbs component
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  )
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
      <AppointmentModalProvider>
        <BackgroundOrbs />
        <Header />
        <main className="min-h-[calc(100vh-300px)] relative">{children}</main>
        <Footer />
        <FloatingCTA />
        <CookieConsent />
        <ScrollToTop />
      </AppointmentModalProvider>
    </NextIntlClientProvider>
  )
}
