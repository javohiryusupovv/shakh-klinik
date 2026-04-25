// Sticky glass Header — RSC. Translations resolved server-side via getTranslations.
// Uses LanguageSwitcher (client) and BookCTAButton (client) — both are client islands
// inside an otherwise server-rendered shell (PITFALLS §11 — glass selective).
import { getTranslations } from 'next-intl/server'
import { Phone } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { MobileMenu } from '@/components/layout/MobileMenu'

const NAV_KEYS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'reviews', href: '/reviews' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contacts', href: '/contacts' },
] as const

export async function Header() {
  const tNav = await getTranslations('nav')
  const tHeader = await getTranslations('header')

  return (
    <header className="glass sticky top-0 z-50 mx-2 mt-2 rounded-2xl md:mx-4 md:mt-4">
      <div className="container mx-auto flex h-[60px] items-center gap-4 px-4 md:h-[72px]">
        {/* Logo wordmark */}
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-[var(--color-text-dark)] md:text-2xl"
          aria-label="ShaxKlinika"
        >
          Shax<span className="text-[var(--color-mint)]">Klinika</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV_KEYS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-dark)] transition-colors hover:bg-white/60 hover:text-[var(--color-primary-deep)]"
            >
              {tNav(key)}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {/* Emergency phone — desktop only */}
          <a
            href="tel:+998901234567"
            aria-label={`${tHeader('emergency24h')} +998 90 123-45-67`}
            className="hidden items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-200 transition-colors hover:bg-red-100 lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+998 90 123-45-67</span>
          </a>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <div className="hidden md:block">
            <BookCTAButton />
          </div>

          {/* Hamburger — mobile only (component is md:hidden internally) */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
