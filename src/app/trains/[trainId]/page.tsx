import Link from 'next/link'
import { ArrowLeft, CalendarDays, Check, Clock3, TrainFront } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { getTrainById } from '@/services/trainService'
import { CatalogBookingPanel } from '@/components/booking/CatalogBookingPanel'
import { BookingProgress, CATALOG_BOOKING_STEPS } from '@/components/booking/BookingProgress'

export default async function TrainDetailsPage({ params, searchParams }: { params: Promise<{ trainId: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { trainId } = await params
  const query = searchParams ? await searchParams : {}
  const journeyDate = typeof query.journeyDate === 'string' ? query.journeyDate : undefined
  const train = await getTrainById(trainId)

  if (!train) return <div className="section-gap"><Container><Card className="py-12 text-center"><h1 className="text-h2">Train route not found</h1><p className="mt-2 text-[var(--color-text-secondary)]">This route is not in the current catalog.</p><Button className="mt-6" asChild><Link href="/trains">Back to trains</Link></Button></Card></Container></div>

  const price = Number(train.price.replace(/[^\d.]/g, '')) || 0
  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20 pt-6 sm:pt-8">
      <Container className="max-w-6xl">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/trains">Back to trains</Link></Button>
        <BookingProgress currentStep="trip" steps={CATALOG_BOOKING_STEPS} className="mx-auto max-w-2xl py-5" />
        <div className="mt-2 rounded-2xl bg-gradient-to-br from-[#063b24] via-[#0b512e] to-[#173e14] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4"><span className="rounded-xl bg-[var(--yellow)] p-3 text-[var(--green-dark)]"><TrainFront size={28} /></span><div><p className="text-sm font-semibold uppercase tracking-wide text-[var(--yellow)]">Train ticket · {train.number}</p><h1 className="mt-1 font-heading text-3xl font-semibold sm:text-4xl">{train.name}</h1><p className="mt-1 text-white/80">{train.from} to {train.to}</p></div></div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">Sample schedule</span>
          </div>
          <div className="mt-7 grid gap-4 rounded-xl border border-white/15 bg-white/10 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-5">
            <div><p className="text-sm opacity-75">Departure</p><p className="mt-1 text-2xl font-bold">{train.departure}</p><p className="font-medium">{train.from}</p></div>
            <div className="flex items-center gap-2 text-sm sm:flex-col"><span className="h-px w-12 bg-current sm:h-8 sm:w-px"/><Clock3 size={16}/><span>{train.duration}</span><span className="h-px w-12 bg-current sm:h-8 sm:w-px"/></div>
            <div className="sm:text-right"><p className="text-sm opacity-75">Arrival</p><p className="mt-1 text-2xl font-bold">{train.arrival}</p><p className="font-medium">{train.to}</p></div>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
              <Card className="rounded-2xl border-[var(--color-border-light)] p-6 shadow-[var(--shadow-sm)] sm:p-7">
              <h2 className="text-xl font-bold">Journey details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-xl bg-[var(--color-surface-secondary)] p-4"><CalendarDays className="mt-0.5 text-[var(--color-primary)]" size={20}/><div><p className="text-sm text-[var(--color-text-secondary)]">Travel date</p><p className="font-semibold">{journeyDate || 'Choose date in search'}</p></div></div>
                <div className="flex gap-3 rounded-xl bg-[var(--color-surface-secondary)] p-4"><Clock3 className="mt-0.5 text-[var(--color-primary)]" size={20}/><div><p className="text-sm text-[var(--color-text-secondary)]">Journey duration</p><p className="font-semibold">{train.duration}</p></div></div>
              </div>
              <h3 className="mt-6 font-semibold">Available classes</h3>
              <div className="mt-3 flex flex-wrap gap-2">{train.classes.map((item) => <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium"><Check size={14} className="text-[var(--color-primary)]"/>Class {item}</span>)}</div>
            </Card>
            <Card className="rounded-2xl border-[var(--color-border-light)] p-6 shadow-[var(--shadow-sm)] sm:p-7"><h2 className="text-lg font-bold">Before you book</h2><ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]"><li>• Keep passenger names consistent with valid travel ID.</li><li>• The fare and schedule shown are sample catalog details.</li><li>• This preview does not issue a railway ticket or PNR.</li></ul></Card>
          </div>
          <CatalogBookingPanel title={`${train.name} · ${train.from} to ${train.to}`} price={price} date={journeyDate} options={train.classes} optionLabel="Travel class" quantityLabel="Passengers" />
        </div>
      </Container>
    </div>
  )
}
