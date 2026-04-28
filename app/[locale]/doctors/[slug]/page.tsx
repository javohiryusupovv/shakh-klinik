import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getDoctorBySlug, getAllDoctors } from '@/lib/services'
import { AppointmentButton } from '@/components/shared/AppointmentButton'
import { GlassCard } from '@/components/shared/GlassCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const doctors = getAllDoctors()
  return doctors.map(d => ({ slug: d.slug }))
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)
  
  if (!doctor) {
    notFound()
  }
  
  const t = await getTranslations('doctors.' + slug)

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-mint)]/20 flex items-center justify-center text-7xl">
          👨‍⚕️
        </div>
        <h1 className="text-4xl font-heading mb-2">{t('name')}</h1>
        <p className="text-xl text-[var(--color-mint)] mb-2">{t('specialty')}</p>
        <p className="text-[var(--color-text-gray)]">{doctor.experienceYears} лет опыта</p>
      </div>
      
      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Образование</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed">{t('education')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Достижения</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed">{t('achievements')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">О враче</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed whitespace-pre-line">{t('bio')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">График работы</h2>
        <p className="text-lg">{doctor.workingHours}</p>
      </GlassCard>

      <AppointmentButton doctorSlug={slug} />
    </main>
  )
}