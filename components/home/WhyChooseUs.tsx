'use client'

import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'

const reasons = [
  { icon: '🏥', title: 'Современное оборудование', desc: 'Диагностика и лечение экспертного уровня' },
  { icon: '👨‍⚕️', title: 'Опытные врачи', desc: 'Стаж от 10 лет, регулярное повышение квалификации' },
  { icon: '⏰', title: 'Удобное время', desc: 'Работаем с 8:00 до 20:00 без выходных' },
  { icon: '💊', title: 'Качественные препараты', desc: 'Только сертифицированные лекарства' },
  { icon: '📱', title: 'Онлайн запись', desc: 'Запишитесь в любое время через сайт' },
  { icon: '🩺', title: 'Полный спектр услуг', desc: 'От диагностики до реабилитации' },
]

export function WhyChooseUs() {
  const t = useTranslations('home')
  
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12">Почему выбирают нас</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <GlassCard key={i} className="p-6 text-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-[var(--color-text-gray)]">{reason.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}