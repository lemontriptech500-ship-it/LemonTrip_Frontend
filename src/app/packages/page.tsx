import type { Metadata } from 'next'
import Link from 'next/link'
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
        <Link href="/trip-planner" className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#E8F2EE] p-5 text-[#0F382C] transition hover:shadow-md">
          <span><strong className="block text-lg">LemonTrip AI — Plan your perfect trip</strong><span className="text-sm">Personalised itineraries, budget estimates and holidays for your travel style.</span></span>
          <span className="rounded-full bg-[#FFD000] px-5 py-2 text-sm font-bold">Try the trip planner →</span>
        </Link>
        <PackageExplorer packages={packages} />
      </Container>
    </div>
  )
}
