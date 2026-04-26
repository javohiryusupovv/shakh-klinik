import { useTranslations } from 'next-intl'
import { HeroWrapper } from '@/components/home/HeroWrapper'
import { AboutSection } from '@/components/home/AboutSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { PopularServices } from '@/components/home/PopularServices'
import { Stats } from '@/components/home/Stats'
import { FeaturedDoctors } from '@/components/home/FeaturedDoctors'
import { LatestNews } from '@/components/home/LatestNews'
import { Reviews } from '@/components/home/Reviews'
import { FAQ } from '@/components/home/FAQ'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  const t = useTranslations('home')
  return (
    <main>
      <HeroWrapper />
      <AboutSection />
      <WhyChooseUs />
      <PopularServices />
      <Stats />
      <FeaturedDoctors />
      <LatestNews />
      <Reviews />
      <FAQ />
      <CTASection />
    </main>
  )
}