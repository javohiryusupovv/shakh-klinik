import type { Metadata } from 'next'
import { Inter, PT_Sans, Geist } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getLocale } from 'next-intl/server'
import { SITE_URL } from '@/lib/seo/config'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// D-12: Inter with latin + cyrillic subsets, display swap, CSS variable
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

// D-12: PT Sans with latin + cyrillic subsets, weights 400 + 700, CSS variable
const ptSans = PT_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
})

// D-16: metadataBase for canonical URLs and OG metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

// Root layout: fonts + analytics + metadataBase + html lang via next-intl getLocale
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      dir="ltr"
      className={cn(inter.variable, ptSans.variable, 'font-sans', geist.variable)}
    >
      <body>
        {children}
        {/* D-18: GA4 via @next/third-parties, guarded on env var — non-blocking */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
