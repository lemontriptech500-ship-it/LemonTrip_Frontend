import Link from 'next/link'
import { ArrowLeft, Clock, TrainFront } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { getTrainById } from '@/services/trainService'
import { TrainBookingPanel } from '@/components/trains/TrainBookingPanel'

export default async function TrainDetailsPage({ params, searchParams }: { params: Promise<{ trainId: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { trainId } = await params
  const query = searchParams ? await searchParams : {}
  const journeyDate = typeof query.journeyDate === 'string' ? query.journeyDate : undefined
  const train = await getTrainById(trainId)

  if (!train) {
    return (
      <div className="section-gap">
        <Container>
          <Card className="text-center py-12">
            <h1 className="text-h2 text-[var(--color-text-primary)] mb-2">Train route not found</h1>
            <p className="text-[var(--color-text-secondary)] mb-6">This catalog route is no longer available.</p>
            <Button asChild>
              <Link href="/trains">Back to trains</Link>
            </Button>
          </Card>
        </Container>
      </div>
    )
  }

  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container className="max-w-3xl">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}>
          <Link href="/trains">Back to trains</Link>
        </Button>

        <Card className="mt-6" padding="lg">
          <div className="flex items-start gap-4">
            <div className="rounded-[var(--radius-md)] bg-[var(--color-secondary-soft)] p-4 text-[var(--color-secondary)]">
              <TrainFront size={28} />
            </div>
            <div>
              <h1 className="text-h1">{train.name}</h1>
              <p className="mt-1 text-[var(--color-text-secondary)]">Train {train.number}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 border-y border-[var(--color-border-light)] py-6 sm:grid-cols-3">
            <div>
              <p className="text-caption text-[var(--color-text-secondary)]">Departure</p>
              <p className="mt-1 text-xl font-bold">{train.departure}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{train.from}</p>
            </div>
            <div>
              <p className="text-caption text-[var(--color-text-secondary)]">Journey</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                <Clock size={16} className="text-[var(--color-primary)]" />
                {train.duration}
              </p>
            </div>
            <div>
              <p className="text-caption text-[var(--color-text-secondary)]">Arrival</p>
              <p className="mt-1 text-xl font-bold">{train.arrival}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{train.to}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-caption text-[var(--color-text-secondary)] mb-2">Available Classes</p>
            <div className="flex flex-wrap gap-2">
              {train.classes.map((item) => (
                <span key={item} className="rounded-full bg-[var(--color-surface-secondary)] px-3 py-1 text-sm font-semibold text-[var(--color-text-secondary)]">
                  Class {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-4">
            <div>
              <p className="text-caption text-[var(--color-text-secondary)]">Catalog fare</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{train.price}</p>
            </div>
          </div>
          <TrainBookingPanel train={train} journeyDate={journeyDate} />
        </Card>
      </Container>
    </div>
  )
}
