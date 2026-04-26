'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SERVICES, CATEGORIES } from '@/lib/data/content'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/ui/button'
import { Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  service: {
    slug: string
    priceMin: number
    priceMax: number
    durationMinutes: number
    categoryId: string
  }
}

function formatPrice(min: number, max: number): string {
  return `${min.toLocaleString()} – ${max.toLocaleString()} UZS`
}

function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services')
  
  return (
    <Link href={`/services/${service.slug}`}>
      <GlassCard className="p-6 group cursor-pointer h-full" glow="primary">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#4A9EE7] transition-colors">
          {t(`${service.slug}.name`)}
        </h3>
        <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">
          {t(`${service.slug}.description`).slice(0, 80)}...
        </p>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-[#4A9EE7] font-semibold">
            {formatPrice(service.priceMin, service.priceMax)}
          </span>
          <span className="text-sm text-[#6B7280] flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.durationMinutes} мин
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}

export default function ServicesPage() {
  const t = useTranslations('services')
  const tCategories = useTranslations('categories')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filtered = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.categoryId === selectedCategory)

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading mb-4">Наши услуги</h1>
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
          Профессиональная медицинская помощь для всей семьи в удобное для вас время
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            selectedCategory === 'all' 
              ? 'bg-[#4A9EE7] text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Все услуги
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === cat.id 
                ? 'bg-[#4A9EE7] text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tCategories(`${cat.id}.name`)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#6B7280] text-lg">Услуги в этой категории не найдены</p>
        </div>
      )}
    </main>
  )
}