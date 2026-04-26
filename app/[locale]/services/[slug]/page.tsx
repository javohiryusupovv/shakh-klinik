import { useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import { useAppointmentModal } from '@/components/shared/AppointmentModalProvider'
import { GlassCard } from '@/components/shared/GlassCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map(s => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  const t = useTranslations('services.' + slug)
  const { open } = useAppointmentModal()

  function formatPrice(min: number, max: number): string {
    return `${min.toLocaleString()} – ${max.toLocaleString()} UZS`
  }

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <h1 className="text-4xl font-heading mb-6">{t('name')}</h1>
      
      <GlassCard className="p-8 mb-8">
        <p className="text-lg text-[var(--color-text-dark)] leading-relaxed whitespace-pre-line">
          {t('description')}
        </p>
      </GlassCard>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <GlassCard className="p-5">
          <p className="text-sm text-[var(--color-text-gray)] mb-1">Стоимость</p>
          <p className="text-2xl font-semibold text-[var(--color-primary)]">
            {formatPrice(service.priceMin, service.priceMax)}
          </p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-[var(--color-text-gray)] mb-1">Длительность</p>
          <p className="text-2xl font-semibold">{service.durationMinutes} мин</p>
        </GlassCard>
      </div>

      <button 
        onClick={() => open({ serviceSlug: slug })}
        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Записаться на приём
      </button>
    </main>
  )
}