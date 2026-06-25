'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, Phone, Info, Stethoscope, Users, Newspaper, Star, Camera, Mail } from 'lucide-react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import ShakhLogo from "@/public/shakh.png"

const NAV_ITEMS = [
  { key: 'about', href: '/about', icon: Info },
  { key: 'services', href: '/services', icon: Stethoscope },
  { key: 'doctors', href: '/doctors', icon: Users },
  { key: 'news', href: '/news', icon: Newspaper },
  { key: 'reviews', href: '/reviews', icon: Star },
  { key: 'gallery', href: '/gallery', icon: Camera },
  { key: 'contacts', href: '/contact', icon: Mail },
] as const

export function MobileMenu() {
  const tNav = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <Menu className="w-5 h-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[350px] bg-white/95 backdrop-blur-xl p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              {/* Crown logo — actual clinic PNG */}
              <div className='w-full h-[90px]'>
                <Link href="/">
                  <Image src={ShakhLogo} className='-translate-y-5' width={75} height={75} alt='Shakh Clinics' />
                </Link>
              </div>

            </Link>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="grid gap-1">
              {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active
                      ? 'bg-[#4A9EE7]/10 text-[#4A9EE7]'
                      : 'text-[#6B7280] hover:bg-[#4A9EE7]/10 hover:text-[#4A9EE7]'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tNav(key)}
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-center mb-4">
              <LanguageSwitcher direction="up" align="center" />
            </div>
            <a
              href="tel:+79777120303"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white font-semibold mb-4"
              style={{
                background: 'linear-gradient(135deg, #4A9EE7 0%, #1A5A94 100%)',
                boxShadow: '0 3px 10px rgba(74,158,231,0.38)',
              }}
            >
              <Phone className="w-5 h-5" />
              <span>+7 (977) 712-03-03</span>
            </a>
            <BookCTAButton className="w-full" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
