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
import { SplashScreen } from '@/components/shared/SplashScreen'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AppointmentModalProvider>
        <SplashScreen />
        <div className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-[#E8F4FD]">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <FloatingCTA />
          <CookieConsent />
          <ScrollToTop />
        </div>
      </AppointmentModalProvider>
    </NextIntlClientProvider>
  )
}