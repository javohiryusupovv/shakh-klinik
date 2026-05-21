'use client'

import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import { BookCTAButton } from '@/components/shared/BookCTAButton'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-12 text-center">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6">{t('infoHeading')}</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">{t('addressLabel')}</p>
                  <a
                    href="https://yandex.uz/maps/org/shakh_clinic/243929874987/?from=mapframe&ll=37.551097%2C55.878410&z=16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-gray)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline"
                  >
                    {t('addressValue')}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">{t('phonesLabel')}</p>
                  <a href="tel:+79778531351" className="block text-[var(--color-text-gray)] hover:text-[var(--color-primary)]">{t('phonePrimary')}</a>
                  <p className="text-[var(--color-primary)] font-semibold">{t('emergencyPrefix')}: +7 (977) 853-13-51</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">{t('hoursLabel')}</p>
                  <p className="text-[var(--color-text-gray)]">{t('hoursWeekdays')}</p>
                  <p className="text-[var(--color-text-gray)]">{t('hoursSunday')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <p className="font-semibold">{t('emailLabel')}</p>
                  <a href="mailto:info@shaxklinika.uz" className="text-[var(--color-text-gray)] hover:text-[var(--color-primary)]">info@shaxklinika.uz</a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6">{t('mapHeading')}</h2>
            <div className="rounded-xl overflow-hidden h-80">
              <iframe
                src="https://yandex.uz/map-widget/v1/?oid=243929874987&ol=biz&ll=37.551097%2C55.878410&z=16"
                title="Shakh Clinic on Yandex Maps"
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
        <h2 className="text-2xl font-semibold mb-4">{t('consultationHeading')}</h2>
        <p className="text-[var(--color-text-gray)] mb-6">{t('consultationBlurb')}</p>
        <BookCTAButton />
      </GlassCard>
    </main>
  )
}