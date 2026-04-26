'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const heroSlides = [
  { title: 'Качественная медицина для всей семьи', subtitle: 'Современное оборудование и опытные врачи', cta: 'Записаться' },
  { title: 'Диагностика нового поколения', subtitle: 'Точные результаты за короткое время', cta: 'Подробнее' },
  { title: 'Комфорт и забота о пациенте', subtitle: 'Без очередей и ожидания', cta: 'Выбрать услугу' },
  { title: 'Ваше здоровье — наш приоритет', subtitle: 'Индивидуальный подход к каждому', cta: 'Консультация' },
]

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-mint)]/10">
              <div className="text-center space-y-4 p-8">
                <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-text-dark)]">{slide.title}</h1>
                <p className="text-xl text-[var(--color-text-gray)]">{slide.subtitle}</p>
                <button className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white rounded-full hover:opacity-90 transition-opacity">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}