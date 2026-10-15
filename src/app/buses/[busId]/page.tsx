import Link from 'next/link'
import { ArrowLeft, Armchair, BusFront, CalendarDays, Clock3, MapPin, ShieldCheck, Wifi } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { getBusById } from '@/services/busService'
import { CatalogBookingPanel } from '@/components/booking/CatalogBookingPanel'
import { BookingProgress, CATALOG_BOOKING_STEPS } from '@/components/booking/BookingProgress'

export const dynamic = 'force-dynamic'

export default async function BusDetailsPage({ params, searchParams }: { params: Promise<{ busId: string }>; searchParams?: Promise<{ travelDate?: string }> }) {
  const { busId } = await params
  const query = searchParams ? await searchParams : {}
  const travelDate = query.travelDate
  const bus = await getBusById(busId)
  if (!bus) return <div className="section-gap"><Container><Card className="py-12 text-center"><h1 className="text-h2">Bus ride not found</h1><p className="mt-2 text-[var(--color-text-secondary)]">This service is not in the current catalog.</p><Button className="mt-6" asChild><Link href="/buses">Back to buses</Link></Button></Card></Container></div>

  const price = Number(bus.price.replace(/[^\d.]/g, '')) || 0
  const stops = bus.metadata?.boardingPoints || []
  const dropPoints = bus.metadata?.dropPoints || []
  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20 pt-6 sm:pt-8">
      <Container className="max-w-6xl">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/buses">Back to buses</Link></Button>
        <BookingProgress currentStep="trip" steps={CATALOG_BOOKING_STEPS} className="mx-auto max-w-2xl py-5" />
        <div className="mt-2 rounded-2xl bg-gradient-to-br from-[#063b24] via-[#0b512e] to-[#173e14] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4"><span className="rounded-xl bg-[var(--yellow)] p-3 text-[var(--green-dark)]"><BusFront size={28}/></span><div><p className="text-sm font-semibold uppercase tracking-wide text-[var(--yellow)]">Bus ticket · {bus.busType}</p><h1 className="mt-1 font-heading text-3xl font-semibold sm:text-4xl">{bus.operator}</h1><p className="mt-1 text-white/80">{bus.from} to {bus.to}</p></div></div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">Sample schedule</span>
          </div>
          <div className="mt-7 grid gap-4 rounded-xl border border-white/15 bg-white/10 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-5">
            <div><p className="text-sm opacity-75">Departure</p><p className="mt-1 text-2xl font-bold">{bus.departure}</p><p className="font-medium">{bus.from}</p></div>
            <div className="flex items-center gap-2 text-sm sm:flex-col"><span className="h-px w-12 bg-current sm:h-8 sm:w-px"/><Clock3 size={16}/><span>{bus.duration}</span><span className="h-px w-12 bg-current sm:h-8 sm:w-px"/></div>
            <div className="sm:text-right"><p className="text-sm opacity-75">Arrival</p><p className="mt-1 text-2xl font-bold">{bus.arrival}</p><p className="font-medium">{bus.to}</p></div>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <Card className="rounded-2xl border-[var(--color-border-light)] p-6 shadow-[var(--shadow-sm)] sm:p-7">
              <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Trip details</h2><span className="rounded-full bg-[var(--color-surface-secondary)] px-3 py-1 text-xs font-semibold">{bus.seatsLeft} seats shown</span></div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl bg-[var(--color-surface-secondary)] p-4"><CalendarDays className="mt-0.5 text-[var(--color-primary)]" size={20}/><div><p className="text-sm text-[var(--color-text-secondary)]">Travel date</p><p className="font-semibold">{travelDate || 'Choose date in search'}</p></div></div>
                <div className="flex gap-3 rounded-xl bg-[var(--color-surface-secondary)] p-4"><Armchair className="mt-0.5 text-[var(--color-primary)]" size={20}/><div><p className="text-sm text-[var(--color-text-secondary)]">Coach</p><p className="font-semibold">{bus.busType}</p></div></div>
              </div>
              {(stops.length > 0 || dropPoints.length > 0) && <div className="mt-6 grid gap-4 sm:grid-cols-2"><div><h3 className="mb-2 font-semibold">Boarding points</h3>{stops.map((point) => <p className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]" key={point}><MapPin size={15} className="mt-0.5 shrink-0"/>{point}</p>)}</div><div><h3 className="mb-2 font-semibold">Drop points</h3>{dropPoints.map((point) => <p className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]" key={point}><MapPin size={15} className="mt-0.5 shrink-0"/>{point}</p>)}</div></div>}
              {bus.metadata?.amenities?.length ? <div className="mt-6"><h3 className="mb-2 font-semibold">Onboard amenities</h3><div className="flex flex-wrap gap-2">{bus.metadata.amenities.map((amenity) => <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm capitalize"><Wifi size={14} className="text-[var(--color-primary)]"/>{amenity}</span>)}</div></div> : null}
            </Card>
            <Card className="rounded-2xl border-[var(--color-border-light)] p-6 shadow-[var(--shadow-sm)]"><div className="flex gap-3"><ShieldCheck size={20} className="text-[var(--color-primary)]"/><div><h2 className="font-bold">Cancellation information</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">{bus.metadata?.cancellation || 'Check cancellation terms with the operator before booking.'}</p><p className="mt-3 text-xs text-[var(--color-text-secondary)]">This is sample catalog inventory. The preview does not reserve an actual seat.</p></div></div></Card>
          </div>
          <CatalogBookingPanel title={`${bus.operator} · ${bus.from} to ${bus.to}`} price={price} currency={bus.currency || 'INR'} date={travelDate} options={[bus.busType]} optionLabel="Bus type" quantityLabel="Seats" />
        </div>
      </Container>
    </div>
  )
}
