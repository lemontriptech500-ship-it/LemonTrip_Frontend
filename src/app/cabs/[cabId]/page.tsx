import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BriefcaseBusiness, CarFront, Fuel, UsersRound } from 'lucide-react'
import { CabBookingPanel } from '@/components/cabs/CabBookingPanel'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { Button, Card, Container } from '@/components/ui'
import { getCabById, type CabOption } from '@/services/cabService'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Book a Cab',
  description: 'Choose a LemonTrip cab and reserve a ride for your journey.',
}

export default async function CabDetailsPage({ params }: { params: Promise<{ cabId: string }> }) {
  const { cabId } = await params
  let cab: CabOption | null = null
  let unavailable = false
  try {
    cab = await getCabById(cabId)
  } catch {
    unavailable = true
  }

  if (!cab) {
    return (
      <div className="min-h-[60vh] bg-[var(--color-background)] py-12">
        <Container className="max-w-3xl">
          <Card className="p-8 text-center sm:p-12">
            <CarFront size={36} className="mx-auto text-[var(--green-2)]" />
            <h1 className="mt-4 text-2xl font-semibold text-[var(--green-dark)]">{unavailable ? 'Cab details are unavailable' : 'Cab not found'}</h1>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{unavailable ? 'Please try again shortly.' : 'This cab may no longer be available.'}</p>
            <Button className="mt-6" asChild><Link href="/cabs">Back to cabs</Link></Button>
          </Card>
        </Container>
      </div>
    )
  }

  const heroImage = cab.imageUrl || PAGE_HERO_IMAGES.travel
  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-16">
      <FlightPageHero
        backgroundImage={heroImage}
        title={cab.name}
        subtitle={`${cab.category} in ${cab.city} · up to ${cab.passengerCapacity} passengers`}
      />
      <Container className="pt-7">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/cabs">All cabs</Link></Button>
        <div className="mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-5">
            <Card className="overflow-hidden p-0">
              <div className="h-64 bg-gradient-to-br from-[#dce9e2] to-[#a8c7b5] bg-cover bg-center" style={cab.imageUrl ? { backgroundImage: `url("${cab.imageUrl.replaceAll('"', '')}")` } : undefined} />
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="text-sm font-semibold text-[var(--green-2)]">{cab.category} · {cab.city}</p><h1 className="mt-1 text-2xl font-bold text-[var(--green-dark)]">{cab.name}</h1></div>
                  <p className="text-right text-xl font-bold text-[var(--green-dark)]">₹{Number(cab.pricePerKm).toLocaleString('en-IN')}<span className="text-sm font-medium text-[var(--color-text-secondary)]">/km</span></p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-4">
                  <span className="flex items-center gap-2"><UsersRound size={17} /> {cab.passengerCapacity} passengers</span>
                  <span className="flex items-center gap-2"><BriefcaseBusiness size={17} /> {cab.luggageCapacity} bags</span>
                  <span className="flex items-center gap-2"><Fuel size={17} /> {cab.fuelType}</span>
                  <span className="flex items-center gap-2"><CarFront size={17} /> {cab.transmission}</span>
                </div>
                {cab.features.length > 0 && <div className="mt-6"><h2 className="font-semibold text-[var(--green-dark)]">Ride features</h2><ul className="mt-3 flex flex-wrap gap-2">{cab.features.map((feature) => <li key={feature} className="rounded-full bg-[var(--color-background-soft)] px-3 py-1.5 text-sm text-[var(--color-text-secondary)]">{feature}</li>)}</ul></div>}
                <p className="mt-6 border-t border-[var(--color-border-light)] pt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">Base fare ₹{Number(cab.baseFare).toLocaleString('en-IN')} plus ₹{Number(cab.pricePerKm).toLocaleString('en-IN')} per billable kilometre. Final pricing is confirmed with the cab operator.</p>
              </div>
            </Card>
            <Card className="p-5 sm:p-6">
              <h2 className="font-semibold text-[var(--green-dark)]">Before you book</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <li>Enter the approximate distance for your trip so we can calculate an estimate.</li>
                <li>For a round trip, both journey legs are included in the estimated fare.</li>
                <li>The operator confirms the route, availability, and final fare before the ride.</li>
              </ul>
            </Card>
          </div>
          <CabBookingPanel cab={cab} />
        </div>
      </Container>
    </div>
  )
}
