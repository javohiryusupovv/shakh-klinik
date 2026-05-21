'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useTranslations } from 'next-intl'
import { SERVICES, DOCTORS, REVIEWS } from '@/lib/data/content'

export function Reviews() {
  const tReviews = useTranslations('reviews')
  const tSection = useTranslations('home.reviews')


  const reviewsData = REVIEWS.map(r => {
    const service = SERVICES.find(s => s.slug === r.serviceSlug)
    const doctor = DOCTORS.find(d => d.slug === r.doctorSlug)
    return {
      ...r,
      text: tReviews(`${r.id}.text`),
      reviewerName: tReviews(`${r.id}.reviewerName`),
      serviceName: service?.slug || '',
      doctorName: doctor?.slug || ''
    }
  })
  
  return (
    <section className="py-16 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-mint)]/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-heading text-center mb-12" data-aos="fade-up">{tSection('heading')}</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="pb-12"
        >
          {reviewsData.slice(0, 10).map((review, i) => (
            <SwiperSlide key={i}>
              <div className="glass p-6 mx-2 rounded-2xl">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-[var(--color-text-dark)] mb-4 line-clamp-3">{review.text}</p>
                <p className="font-semibold text-sm">{review.reviewerName}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}