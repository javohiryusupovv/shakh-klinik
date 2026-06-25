'use client'

import { useState, useCallback, useEffect } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/shared/Reveal'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import GaleryImg1 from '../../public/_clinic_original/Shakh Clinic-57.jpg'
import GaleryImg2 from '../../public/_clinic_original/karidor.jpg'
import GaleryImg3 from '../../public/_clinic_original/room1.jpg'
import GaleryImg4 from '../../public/_clinic_original/room2.jpg'
import GaleryImg5 from '../../public/_clinic_original/home_1.png'
import GaleryImg6 from '../../public/_clinic_original/home_2.png'

const IMAGES: StaticImageData[] = [
  GaleryImg5,
  GaleryImg6,
  GaleryImg1,
  GaleryImg2,
  GaleryImg3,
  GaleryImg4,
]

// ── Lightbox ───────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: StaticImageData[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  )
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center select-none"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium pointer-events-none">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      {/* Main image */}
      <div
        className="relative w-full max-w-5xl mx-20 md:mx-28 aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`Gallery ${current + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-14 h-10 rounded-lg overflow-hidden transition-all duration-200 ${
              i === current ? 'ring-2 ring-white scale-110' : 'opacity-45 hover:opacity-75'
            }`}
          >
            <Image src={img} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Gallery grid ───────────────────────────────────────────────────────────────
export function AboutGallery() {
  const t = useTranslations('about.gallery')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-[var(--color-text-dark)]">
            {t('heading')}
          </h2>
          <p className="text-lg text-[var(--color-text-gray)]">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map((src, i) => (
            <Reveal key={i} delay={i * 70}>
              <button
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md w-full block cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={`${t('heading')} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={IMAGES}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
