'use client'

import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import { REVIEWS } from '@/lib/data/content'

type ReviewItem = { id: string; rating: number; text: string; reviewerName: string }

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="glass rounded-2xl p-6 border border-[var(--color-primary)]/10 h-full">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-mint)]/20 flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-[var(--color-primary)]" />
      </div>
      <p className="text-[var(--color-text-dark)] text-[15px] leading-relaxed mb-5 line-clamp-4">
        {review.text}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-deep)] flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {review.reviewerName.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[var(--color-text-dark)] truncate">
            {review.reviewerName}
          </p>
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, j) => (
              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Desktop: vertical auto-scroll column (CSS marquee, seamless via -50%). */
function ReviewColumn({
  items,
  direction,
}: {
  items: ReviewItem[]
  direction: 'up' | 'down'
}) {
  const track = direction === 'up' ? 'review-track-up' : 'review-track-down'
  return (
    <div className="review-col h-[560px] overflow-hidden">
      <div className={track}>
        {[...items, ...items].map((review, i) => (
          <div key={`${review.id}-${i}`} className="mb-5">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Mobile/tablet: continuous horizontal Swiper marquee. */
function ReviewSwiperRow({ items, reverse = false }: { items: ReviewItem[]; reverse?: boolean }) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView="auto"
      spaceBetween={16}
      loop
      freeMode
      speed={6000}
      allowTouchMove
      autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: reverse }}
    >
      {items.map((review) => (
        <SwiperSlide key={review.id} className="!w-[280px] !h-auto">
          <ReviewCard review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export function Reviews() {
  const tReviews = useTranslations('reviews')
  const tSection = useTranslations('home.reviews')

  const reviews: ReviewItem[] = REVIEWS.map((r) => ({
    id: r.id,
    rating: r.rating,
    text: tReviews(`${r.id}.text`),
    reviewerName: tReviews(`${r.id}.reviewerName`),
  }))

  const colA = reviews.filter((_, i) => i % 2 === 0)
  const colB = reviews.filter((_, i) => i % 2 === 1)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[var(--color-bg-lightest)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          {/* Left — heading */}
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white text-sm font-semibold mb-6 shadow-lg shadow-[var(--color-primary)]/20">
              <Star className="w-4 h-4 fill-white" />
              {reviews.length} {tSection('reviewsLabel')}
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-text-dark)] leading-tight mb-5">
              {tSection('heading')}
            </h2>
            <p className="text-lg text-[var(--color-text-gray)] leading-relaxed max-w-md">
              {tSection('subtitle')}
            </p>
          </div>

          {/* Right — desktop: two vertical columns */}
          <div className="hidden lg:grid grid-cols-2 gap-5">
            <ReviewColumn items={colA} direction="up" />
            <ReviewColumn items={colB} direction="down" />
          </div>
        </div>

        {/* Mobile/tablet: two horizontal swiper rows (opposite directions) */}
        <div className="lg:hidden mt-10 space-y-4">
          <ReviewSwiperRow items={colA} />
          <ReviewSwiperRow items={colB} reverse />
        </div>
      </div>
    </section>
  )
}
