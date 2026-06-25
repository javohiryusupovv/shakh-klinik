'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ChevronRight } from 'lucide-react'
import { useAppointmentModal } from '@/components/shared/AppointmentModalProvider'
import slide1 from '../../public/_slides_original/slide1.jpg'
import slide2 from '../../public/_slides_original/slide2.jpg'
import slide3 from '../../public/_slides_original/slide3.jpg'
import slide4 from '../../public/_slides_original/slide4.jpg'

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4]

type HeroSlide = { title: string; subtitle: string; cta: string }

export function Hero() {
  const t = useTranslations('home.hero')
  const { open } = useAppointmentModal()
  const slides = (t.raw('slides') as HeroSlide[]).map((slide, i) => ({
    ...slide,
    image: SLIDE_IMAGES[i] ?? SLIDE_IMAGES[0],
  }))
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-[75vh] min-h-[600px] flex items-center overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
        onSlideChange={() => setLoaded(true)}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative flex items-center justify-center h-full px-6 overflow-hidden">
              {/* Background image */}
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Premium dark gradient overlay — blue-tinted for brand consistency */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(10,30,60,0.72) 0%, rgba(26,90,148,0.55) 50%, rgba(0,10,30,0.68) 100%)',
                }}
              />

              <div className={`relative z-10 text-center max-w-4xl mx-auto transform transition-all duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => open()}
                  className="group px-8 py-4 max-sm:text-[15px] bg-gradient-to-r from-[#4A9EE7] to-[#2B7FCC] text-white rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto shadow-xl shadow-[#1A5A94]/30"
                >
                  {slide.cta}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
