import { useTranslations } from 'next-intl'

// Home placeholder — reads home.placeholder key to smoke-test end-to-end i18n (D-07, D-09)
// Full page content is Phase 4
export default function HomePage() {
  const t = useTranslations('home')
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('placeholder')}</h1>
      <p style={{ color: '#6B7280', marginTop: '1rem' }}>
        Phase 1 scaffold — full content coming in Phase 4
      </p>
    </div>
  )
}
