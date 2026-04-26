'use client'

import { useTranslations } from 'next-intl'
import type { Category } from '@/lib/data/content'
import { GlassCard } from '@/components/shared/GlassCard'

interface CategoryFilterProps {
  categories: Category[]
  selected: string
  onSelect: (id: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const tCategories = useTranslations('categories')
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded-full transition-colors ${
          selected === 'all' 
            ? 'bg-[var(--color-primary)] text-white' 
            : 'glass hover:bg-[var(--color-primary)]/10'
        }`}
      >
        Все
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selected === cat.id 
              ? 'bg-[var(--color-primary)] text-white' 
              : 'glass hover:bg-[var(--color-primary)]/10'
          }`}
        >
          {tCategories(`${cat.id}.name`)}
        </button>
      ))}
    </div>
  )
}