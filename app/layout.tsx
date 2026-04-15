import type { Metadata } from 'next'
import { Inter, PT_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaxklinika.uz'
  ),
}

// Root layout: fonts + analytics + metadataBase ONLY (D-07)
// All visible UI and html lang live under [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning: locale layout sets lang on html; root layout does not
    <html className={`${inter.variable} ${ptSans.variable}`} suppressHydrationWarning>
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
