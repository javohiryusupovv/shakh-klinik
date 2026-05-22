import { AboutIntro } from '@/components/about/AboutIntro'
import { AboutGallery } from '@/components/about/AboutGallery'
import { Facilities } from '@/components/about/Facilities'
import { CTASection } from '@/components/home/CTASection'

export default function AboutPage() {
  return (
    <main>
      <AboutIntro />
      <AboutGallery />
      <Facilities />
      <CTASection />
    </main>
  )
}
