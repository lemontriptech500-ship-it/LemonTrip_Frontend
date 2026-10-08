import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { searchBuses } from '@/services/busService'
import { BusResultCard } from '@/components/buses/BusResultCard'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { BusSearchForm } from '@/components/search/BusSearchForm'

export const metadata: Metadata = {
  title: 'Bus Booking – Book Bus Tickets',
  description: 'Compare and book bus tickets with LemonTrip for convenient intercity travel.',
}

export const dynamic = 'force-dynamic'

interface BusesPageProps {
  searchParams: Promise<{ from?: string; to?: string; travelDate?: string }>
}

export default async function BusesPage({ searchParams }: BusesPageProps) {
  const params = await searchParams
  const { buses } = await searchBuses({ from: params.from, to: params.to, date: params.travelDate })
  return (
    <div className="bg-[var(--color-background)] pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.bus}
        title="Book bus tickets"
        subtitle="Compare comfortable intercity rides from trusted operators."
      >
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white p-4 shadow-[var(--shadow-lg)] sm:p-6">
          <BusSearchForm />
        </div>
      </FlightPageHero>
      <Container className="pt-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {buses.map((bus) => (
            <BusResultCard key={bus.id} bus={bus} />
          ))}
        </div>
      </Container>
    </div>
  )
}
