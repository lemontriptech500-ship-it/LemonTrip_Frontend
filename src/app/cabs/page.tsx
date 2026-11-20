import type { Metadata } from 'next'
import { CarFront } from 'lucide-react'
import { CabCard } from '@/components/cabs/CabCard'
import { CabSearchForm } from '@/components/cabs/CabSearchForm'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { Container, Card } from '@/components/ui'
import { searchCabs } from '@/services/cabService'
import type { CabOption } from '@/services/cabService'

export const metadata: Metadata = {
  title: 'City Cabs',
  description: 'Browse LemonTrip city cabs by pickup city and vehicle type.',
}

export const dynamic = 'force-dynamic'

interface CabsPageProps {
  searchParams: Promise<{ city?: string; category?: string }>
}

export default async function CabsPage({ searchParams }: CabsPageProps) {
  const params = await searchParams
  let cabs: CabOption[] = []
  let unavailable = false
  try {
    cabs = await searchCabs(params)
  } catch {
    unavailable = true
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-16">
      <FlightPageHero
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="A cab for every journey"
        subtitle="Find a comfortable ride for airport pickups, city travel, and trips beyond the city."
      >
        <Card className="p-4 shadow-[var(--shadow-lg)] sm:p-6">
          <CabSearchForm city={params.city} category={params.category} />
        </Card>
      </FlightPageHero>

      <Container className="pt-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-2)]">LemonTrip rides</p>
            <h2 className="mt-1 text-2xl font-semibold text-[var(--green-dark)]">Available cabs</h2>
          </div>
          {!unavailable && <p className="text-sm text-[var(--color-text-secondary)]">{cabs.length} {cabs.length === 1 ? 'vehicle' : 'vehicles'} found</p>}
        </div>

        {unavailable ? (
          <div role="status" className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center">
            <CarFront size={32} className="mx-auto text-[var(--green-2)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--green-dark)]">Cab listings are temporarily unavailable</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Please try again in a little while.</p>
          </div>
        ) : cabs.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center">
            <CarFront size={32} className="mx-auto text-[var(--green-2)]" />
            <h2 className="mt-4 text-lg font-semibold text-[var(--green-dark)]">No cabs found</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Try another city or cab type.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cabs.map((cab) => <CabCard key={cab.id} cab={cab} />)}
          </div>
        )}
        <p className="mt-6 text-xs text-[var(--color-text-muted)]">Prices are indicative and may vary by route, distance, and trip duration. Confirm the final fare when requesting a quote.</p>
      </Container>
    </div>
  )
}
