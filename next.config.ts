import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// Wire next-intl RSC integration — points to our getRequestConfig (D-08)
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.unsplash.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
