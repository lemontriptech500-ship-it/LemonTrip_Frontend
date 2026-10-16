import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { searchPackages } from '@/services/packageService'
import { PackageExplorer } from '@/components/packages/PackageExplorer'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

export const metadata: Metadata = {
  title: 'Holiday Packages',
  description: 'Explore curated travel packages and tours with LemonTrip.',
}

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const { packages } = await searchPackages({})
  return (
    <div className="bg-[#fbf9f3] pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.package}
        title="Holiday Packages"
        subtitle="Choose from national escapes across India and international holidays around the world."
      />
      <Container className="pt-10 sm:pt-14">
        <PackageExplorer packages={packages} />
      </Container>
    </div>
  )
}
