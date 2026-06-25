'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { MobileMenu } from '@/components/layout/MobileMenu'
import ShakhClinicLogo from "@/public/shakh.png"

const NAV_KEYS = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contact' },
] as const

export function Header() {
  const tNav = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 mx-2 mt-2 transition-all duration-300 ${
        scrolled ? 'top-4' : 'mt-2'
      }`}
    >
      <div className="container mx-auto">
        <div
          className={`relative rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/92 backdrop-blur-xl border border-[#4A9EE7]/14 shadow-[0_4px_28px_rgba(0,0,0,0.09),0_1px_6px_rgba(74,158,231,0.08)]'
              : 'bg-transparent border-transparent'
          }`}
        >
          <div className="flex items-center justify-between h-14 px-4">

            {/* ── Brand logo ─────────────────────────────────────── */}
          <Link href="/">
            <Image src={ShakhClinicLogo} width={45} height={45} alt='Shakh Clinics' />
          </Link>

            {/* ── Desktop nav ────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_KEYS.map(({ key, href }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={key}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                      active
                        ? 'text-[#4A9EE7] bg-[#4A9EE7]/10'
                        : 'text-[#6B7280] hover:text-[#4A9EE7] hover:bg-[#4A9EE7]/10'
                    }`}
                  >
                    {tNav(key)}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right side ─────────────────────────────────────── */}
            <div className="flex items-center gap-2 flex-nowrap shrink-0">
              <a
                href="tel:+79777120303"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold shrink-0 transition-opacity hover:opacity-85"
                style={{
                  background:
                    'linear-gradient(135deg, #4A9EE7 0%, #1A5A94 100%)',
                  boxShadow: '0 2px 8px rgba(74,158,231,0.38)',
                }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden 2xl:inline">+7 (977) 712-03-03</span>
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