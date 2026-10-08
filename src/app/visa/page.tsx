import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { VisaDirectory } from '@/components/visa/VisaDirectory'
import { mockVisaServices } from '@/data/visaServices'

export const metadata: Metadata = {
  title: 'Visa Services',
  description: 'Explore visa support, document checklists and processing timelines for popular destinations with LemonTrip.',
}

export default function VisaPage() {
  return (
    <div className="bg-[#fbf9f3] pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.visa}
        title="Visa Services"
        subtitle="Explore guided visa support options for popular destinations."
      />
      <Container id="visa-directory" className="scroll-mt-6 pt-10 sm:pt-14">
        <VisaDirectory services={mockVisaServices} />
      </Container>
    </div>
  )
}
