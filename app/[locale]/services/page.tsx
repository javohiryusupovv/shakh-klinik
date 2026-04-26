'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SERVICES, CATEGORIES } from '@/lib/data/content'
import { ServiceCard } from '@/components/services/ServiceCard'
import { CategoryFilter } from '@/components/services/CategoryFilter'

export default function ServicesPage() {
  const t = useTranslations('services')
  const tCategories = useTranslations('categories')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filtered = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.categoryId === selectedCategory)

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8">Услуги</h1>
      <CategoryFilter 
        categories={CATEGORIES} 
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </main>
  )
}