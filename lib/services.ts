import { SERVICES, DOCTORS, NEWS, REVIEWS, CATEGORIES, type Service, type Doctor, type NewsArticle, type Review } from './data/content'
import { useTranslations } from 'next-intl'

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug)
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter(s => s.categoryId === categoryId)
}

export function getPopularServices(limit = 8): Service[] {
  return SERVICES.slice(0, limit)
}

export function getAllServices(): Service[] {
  return SERVICES
}

export function getFeaturedDoctors(limit = 6): Doctor[] {
  return DOCTORS.slice(0, limit)
}

export function getAllDoctors(): Doctor[] {
  return DOCTORS
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find(d => d.slug === slug)
}

export function getLatestNews(limit = 3): NewsArticle[] {
  return NEWS.slice(0, limit)
}

export function getAllNews(): NewsArticle[] {
  return NEWS
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS.find(n => n.slug === slug)
}

export function getAllReviews(): Review[] {
  return REVIEWS
}

export interface ReviewWithText extends Review {
  reviewerName: string
  text: string
  serviceName: string  
  doctorName: string
}

export function useReviewsData(): ReviewWithText[] {
  const tReviews = useTranslations('reviews')
  return REVIEWS.map(r => {
    const service = SERVICES.find(s => s.slug === r.serviceSlug)
    const doctor = DOCTORS.find(d => d.slug === r.doctorSlug)
    const text = tReviews(`${r.id}.text`) as string
    const reviewerName = tReviews(`${r.id}.reviewerName`) as string
    return {
      ...r,
      reviewerName,
      text,
      serviceName: service?.slug || '',
      doctorName: doctor?.slug || ''
    }
  })
}

export function getAllCategories() {
  return CATEGORIES
}