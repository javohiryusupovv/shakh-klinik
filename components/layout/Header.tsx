'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
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
  { key: 'contacts', href: '/contact' },
] as const

export function Header() {
  const tNav = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 mx-2 mt-2 transition-all duration-300 ${scrolled ? 'top-4' : 'mt-2'}`}>
      <div className="container mx-auto">
        <div className={`relative rounded-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-white/20' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center justify-between h-14 px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A9EE7] to-[#2B7FCC] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-heading text-lg font-bold text-[#1F2937] hidden sm:block">
                Shakh <span className="text-[#4A9EE7]">Clinic</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_KEYS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="px-3 py-1.5 text-sm font-medium text-[#6B7280] hover:text-[#4A9EE7] hover:bg-[#4A9EE7]/10 rounded-full transition-all"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-nowrap shrink-0">
              <a
                href="tel:+998901234567"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden 2xl:inline">+998 90 123-45-67</span>
              </a>

              <div className="hidden md:block shrink-0">
                <LanguageSwitcher />
              </div>
              <div className="shrink-0">
                <BookCTAButton />
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}