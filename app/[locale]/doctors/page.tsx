'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Users } from 'lucide-react'
import { DOCTORS } from '@/lib/data/content'
import { DoctorCard } from '@/components/shared/DoctorCard'

const DEPT_EMOJIS: Record<string, string> = {
  'general-medicine': '🩺',
  'cardiology-dept': '❤️',
  'neurology-dept': '🧠',
  'womens-health': '🌸',
  'urology-dept': '💧',
  'dermatology-dept': '✨',
  'eye-clinic': '👁️',
  'dental-clinic': '🦷',
  'endocrinology-dept': '⚕️',
  'gastro-dept': '🧬',
  surgery: '🔬',
  'diagnostics-lab': '🧪',
}

export default function DoctorsPage() {
  const t      = useTranslations('doctors')
  const tPage  = useTranslations('pages.doctors')
  const tCommon = useTranslations('common')
  const tDepartments = useTranslations('departments')
  const [dept, setDept] = useState<string>('all')

  const depts   = [...new Set(DOCTORS.map(d => d.departmentId))]
  const filtered = dept === 'all' ? DOCTORS : DOCTORS.filter(d => d.departmentId === dept)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1A5A94 0%,#2B7FCC 55%,#4A9EE7 100%)' }}
      >
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

        <div className="container mx-auto px-6 py-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm mb-5">
            <Users className="w-3.5 h-3.5" />
            <span>{tPage('subtitle')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3 leading-tight">
            {tPage('title')}
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            {DOCTORS.length} {tPage('countLabel')}
          </p>
        </div>
      </div>

      {/* ── Department filter tabs ─────────────────────────────────────── */}
      <div className="sticky top-[92px] z-40 mx-2 mt-5">
        <div className="container mx-auto">
          <div className="rounded-full bg-white/92 backdrop-blur-xl border border-[#4A9EE7]/14 shadow-[0_4px_28px_rgba(0,0,0,0.09),0_1px_6px_rgba(74,158,231,0.08)] px-4">
            <div className="flex gap-1.5 overflow-x-auto py-3 scrollbar-none">
              <button
                onClick={() => setDept('all')}
                className={`shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  dept === 'all'
                    ? 'bg-[#2B7FCC] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tCommon('allFilter')}
              </button>
              {depts.map(d => {
                const emoji = DEPT_EMOJIS[d]
                return (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    className={`shrink-0 flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      dept === d
                        ? 'bg-[#2B7FCC] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {emoji && <span>{emoji}</span>}
                    {tDepartments(`${d}.name`)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Doctor grid ───────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-6 py-8 pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor, i) => (
            <DoctorCard
              key={doctor.slug}
              slug={doctor.slug}
              photo={doctor.photo}
              name={t(`${doctor.slug}.name`)}
              specialty={t(`${doctor.slug}.specialty`)}
              experienceYears={doctor.experienceYears}
              experienceLabel={t('experienceLabel')}
              delay={(i % 3) * 100}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
