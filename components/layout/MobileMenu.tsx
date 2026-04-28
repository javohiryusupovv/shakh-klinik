'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, Phone, Home, Stethoscope, Users, Newspaper, Star, Camera, Mail } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'

const NAV_ITEMS = [
  { key: 'home', href: '/', icon: Home },
  { key: 'services', href: '/services', icon: Stethoscope },
  { key: 'doctors', href: '/doctors', icon: Users },
  { key: 'news', href: '/news', icon: Newspaper },
  { key: 'reviews', href: '/reviews', icon: Star },
  { key: 'gallery', href: '/gallery', icon: Camera },
  { key: 'contacts', href: '/contact', icon: Mail },
] as const

export function MobileMenu() {
  const tNav = useTranslations('nav')
  const [open, setOpen] = useState(false)

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
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A9EE7] to-[#2B7FCC] flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-heading text-lg font-bold">
                Shakh <span className="text-[#4A9EE7]">Clinic</span>
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="grid gap-1">
              {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#4A9EE7]/10 hover:text-[#4A9EE7] transition-all font-medium"
                >
                  <Icon className="w-5 h-5" />
                  {tNav(key)}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-center mb-4">
              <LanguageSwitcher direction="up" align="center" />
            </div>
            <a href="tel:+998901234567" className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-red-500 text-white font-semibold mb-4">
              <Phone className="w-5 h-5" />
              <span>+998 90 123-45-67</span>
            </a>
            <BookCTAButton className="w-full" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}