'use client'

import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function ContactPage() {
  const tFooter = useTranslations('footer')
  
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-12 text-center">Контакты</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Информация</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">Адрес</p>
                  <p className="text-[var(--color-text-gray)]">г. Ташкент, Сергелийский район, ул. Лутфулло Камолиддинова, 45</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">Телефоны</p>
                  <a href="tel:+998901234567" className="block text-[var(--color-text-gray)] hover:text-[var(--color-primary)]">+998 90 123-45-67</a>
                  <p className="text-[var(--color-primary)] font-semibold">Круглосуточно: +998 90 000-00-00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">Время работы</p>
                  <p className="text-[var(--color-text-gray)]">Пн-Сб: 8:00 - 20:00</p>
                  <p className="text-[var(--color-text-gray)]">Вс: 9:00 - 17:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@shaxklinika.uz" className="text-[var(--color-text-gray)] hover:text-[var(--color-primary)]">info@shaxklinika.uz</a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Мы на карте</h2>
            <div className="rounded-xl overflow-hidden h-80">
              <iframe
                src="https://yandex.ru/maps-widget/v1/?ll=37.550379%2C55.878245&mode=search&text=%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD%20%D0%A8%D0%B0%D0%BA%D1%81%D0%B8%D1%82&z=16"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </GlassCard>
        </div>
      </div>
      
      <GlassCard className="p-8 mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Запишитесь на консультацию</h2>
        <p className="text-[var(--color-text-gray)] mb-6">Наши специалисты ответят на все ваши вопросы</p>
        <BookCTAButton />
      </GlassCard>
    </main>
  )
}