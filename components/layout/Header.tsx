import { getTranslations } from 'next-intl/server'
import { Phone, MapPin, Menu } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { MobileMenu } from '@/components/layout/MobileMenu'

const NAV_KEYS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contact' },
] as const

export async function Header() {
  const tNav = await getTranslations('nav')
  const tHeader = await getTranslations('header')

  return (
    <header className="glass sticky top-0 z-50 mx-2 mt-2 rounded-2xl md:mx-4 md:mt-4">
      <div className="container mx-auto flex h-[64px] items-center gap-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-[#1F2937] md:text-2xl flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A9EE7] to-[#A8E6CF] flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          Shax<span className="text-[#4A9EE7]">Klinika</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV_KEYS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="px-4 py-2 text-sm font-medium text-[#1F2937] rounded-full transition-all hover:bg-[#4A9EE7]/10 hover:text-[#4A9EE7]"
            >
              {tNav(key)}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3">
          {/* Emergency phone */}
          <a
            href="tel:+998901234567"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold"
          >
            <Phone className="w-4 h-4" />
            <span>+998 90 123-45-67</span>
          </a>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <div className="hidden md:block">
            <BookCTAButton />
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}