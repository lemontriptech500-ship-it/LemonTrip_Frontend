import type { Metadata } from 'next'
import { Container, SectionHeading } from '@/components/ui'
import { searchBuses } from '@/services/busService'
import { BusResultCard } from '@/components/buses/BusResultCard'

export const metadata: Metadata = {
  title: 'Bus Booking – Book Bus Tickets',
  description: 'Compare and book bus tickets with LemonTrip for convenient intercity travel.',
}

export const dynamic = 'force-dynamic'

export default async function BusesPage() {
  const { buses } = await searchBuses({})
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Buses" description="Compare comfortable intercity rides from trusted operators." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {buses.map((bus) => (
            <BusResultCard key={bus.id} bus={bus} />
          ))}
        </div>
      </Container>
    </div>
  )
}