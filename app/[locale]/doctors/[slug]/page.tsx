import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getDoctorBySlug, getAllDoctors } from '@/lib/services'
import { AppointmentButton } from '@/components/shared/AppointmentButton'
import { GlassCard } from '@/components/shared/GlassCard'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const doctors = getAllDoctors()
  return doctors.map(d => ({ slug: d.slug }))
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const doctor = getDoctorBySlug(slug)

  if (!doctor) {
    notFound()
  }

  const t = await getTranslations('doctors.' + slug)
  const tHeadings = await getTranslations('doctorsDetail')

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <Link
        href={`/${locale}/doctors`}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/70 backdrop-blur-md border border-[#4A9EE7]/20 text-[#1F2937] text-sm font-medium transition-colors hover:bg-white/90"
      >
        <ArrowLeft className="w-4 h-4" />
        {tHeadings('backToDoctors')}
      </Link>

      <div className="text-center mb-8">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-mint)]/20 flex items-center justify-center text-7xl">
          👨‍⚕️
        </div>
        <h1 className="text-4xl font-heading mb-2">{t('name')}</h1>
        <p className="text-xl text-[var(--color-mint)] mb-2">{t('specialty')}</p>
        <p className="text-[var(--color-text-gray)]">{doctor.experienceYears} {tHeadings('experienceSuffix')}</p>
      </div>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">{tHeadings('educationHeading')}</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed">{t('education')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">{tHeadings('achievementsHeading')}</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed">{t('achievements')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">{tHeadings('bioHeading')}</h2>
        <p className="text-[var(--color-text-dark)] leading-relaxed whitespace-pre-line">{t('bio')}</p>
      </GlassCard>

      <GlassCard className="p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">{tHeadings('workingHoursHeading')}</h2>
        <p className="text-lg">{t('workingHours')}</p>
      </GlassCard>

      <AppointmentButton doctorSlug={slug} />
    </main>
  )
}