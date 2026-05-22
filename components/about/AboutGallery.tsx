'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/shared/Reveal'
import GaleryImg1 from "../../public/_clinic_original/Shakh Clinic-57.jpg"
import GaleryImg2 from "../../public/_clinic_original/karidor.jpg"
import GaleryImg3 from "../../public/_clinic_original/room1.jpg"
import GaleryImg4 from "../../public/_clinic_original/room2.jpg"
import GaleryImg5 from "../../public/_clinic_original/home_1.png"
import GaleryImg6 from "../../public/_clinic_original/home_2.png"

const IMAGES = [
  GaleryImg5,
  GaleryImg6,
  GaleryImg1,
  GaleryImg2,
  GaleryImg3,
  GaleryImg4,
]

export function AboutGallery() {
  const t = useTranslations('about.gallery')

  return (
    <section className="container mx-auto px-6 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-[var(--color-text-dark)]">
          {t('heading')}
        </h2>
        <p className="text-lg text-[var(--color-text-gray)]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {IMAGES.map((src, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`${t('heading')} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
