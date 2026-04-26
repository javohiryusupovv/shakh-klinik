import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  Award, 
  Clock, 
  Pill, 
  Smartphone, 
  HeartPulse,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const reasons = [
  { 
    icon: Stethoscope, 
    title: 'Современное оборудование', 
    desc: 'Диагностика и лечение экспертного уровня',
    color: '#4A9EE7'
  },
  { 
    icon: Award, 
    title: 'Опытные врачи', 
    desc: 'Стаж от 10 лет, регулярное повышение квалификации',
    color: '#2B7FCC'
  },
  { 
    icon: Clock, 
    title: 'Удобное время', 
    desc: 'Работаем с 8:00 до 20:00 без выходных',
    color: '#A8E6CF'
  },
  { 
    icon: Pill, 
    title: 'Качественные препараты', 
    desc: 'Только сертифицированные лекарства',
    color: '#4A9EE7'
  },
  { 
    icon: Smartphone, 
    title: 'Онлайн запись', 
    desc: 'Запишитесь в любое время через сайт',
    color: '#2B7FCC'
  },
  { 
    icon: HeartPulse, 
    title: 'Полный спектр услуг', 
    desc: 'От диагностики до реабилитации',
    color: '#A8E6CF'
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-heading text-center mb-4">Почему выбирают нас</h2>
      <p className="text-[#6B7280] text-center text-lg mb-12 max-w-2xl mx-auto">
        Мы заботимся о каждом пациенте и предоставляем качественные медицинские услуги
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <GlassCard 
            key={i} 
            className="p-7 text-center group cursor-pointer"
            glow={reason.color === '#A8E6CF' ? 'mint' : 'primary'}
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${reason.color}15` }}
            >
              <reason.icon className="w-8 h-8" style={{ color: reason.color }} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#1F2937]">{reason.title}</h3>
            <p className="text-sm text-[#6B7280]">{reason.desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/services">
          <Button size="lg" className="gap-2">
            Все услуги <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}