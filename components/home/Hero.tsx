'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ChevronRight } from 'lucide-react'

const heroSlides = [
  { 
    title: 'Качественная медицина для всей семьи', 
    subtitle: 'Современное оборудование и опытные врачи', 
    cta: 'Записаться',
    bg: 'from-[#4A9EE7]/30 to-[#A8E6CF]/20'
  },
  { 
    title: 'Диагностика нового поколения', 
    subtitle: 'Точные результаты за короткое время', 
    cta: 'Подробнее',
    bg: 'from-[#A8E6CF]/30 to-[#4A9EE7]/20'
  },
  { 
    title: 'Комфорт и забота о пациенте', 
    subtitle: 'Без очередей и ожидания', 
    cta: 'Выбрать услугу',
    bg: 'from-[#2B7FCC]/30 to-[#A8E6CF]/20'
  },
  { 
    title: 'Ваше здоровье — наш приоритет', 
    subtitle: 'Индивидуальный подход к каждому', 
    cta: 'Консультация',
    bg: 'from-[#4A9EE7]/20 to-[#2B7FCC]/20'
  },
]

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-[75vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[0].bg} transition-all duration-1000`}>
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A9EE7]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#A8E6CF]/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-[#2B7FCC]/10 blur-2xl" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full"
        onSlideChange={() => setLoaded(true)}
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`flex items-center justify-center h-full px-6 bg-gradient-to-br ${slide.bg}`}>
              <div className={`text-center max-w-4xl mx-auto transform transition-all duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-[#1F2937] leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <button className="group px-8 py-4 bg-gradient-to-r from-[#4A9EE7] to-[#2B7FCC] text-white rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                  {slide.cta}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#4A9EE7]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#4A9EE7] rounded-full" />
        </div>
      </div>
    </section>
  )
}