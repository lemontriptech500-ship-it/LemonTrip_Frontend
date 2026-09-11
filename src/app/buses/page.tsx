import Link from 'next/link'
import { ArrowRight, BusFront, Clock, MapPin } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { searchBuses } from '@/services/busService'

export const dynamic = 'force-dynamic'

export default async function BusesPage() {
  const { buses } = await searchBuses({})
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading title="Buses" description="Compare comfortable intercity rides from trusted operators." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {buses.map((bus) => (
            <Card key={bus.id} className="flex h-full flex-col" hover>
              <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border-light)] pb-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-[var(--radius-md)] bg-[var(--color-primary)] p-3 text-[var(--green-dark)]"><BusFront size={22} /></div>
                  <div><h2 className="font-bold text-[var(--color-text-primary)]">{bus.operator}</h2><p className="text-sm text-[var(--color-text-secondary)]">{bus.busType}</p></div>
                </div>
                <span className="text-xs font-semibold text-[var(--color-primary)]">{bus.seatsLeft} seats left</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-6">
                <div><p className="text-xl font-bold text-[var(--color-text-primary)]">{bus.departure}</p><p className="text-sm text-[var(--color-text-secondary)]">{bus.from}</p></div>
                <div className="flex flex-1 flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)]"><Clock size={14} /><span>{bus.duration}</span><div className="h-px w-full bg-[var(--color-border)]" /></div>
                <div className="text-right"><p className="text-xl font-bold text-[var(--color-text-primary)]">{bus.arrival}</p><p className="text-sm text-[var(--color-text-secondary)]">{bus.to}</p></div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border-light)] pt-5"><span className="font-semibold text-[var(--color-text-primary)]">{bus.price}</span><Button variant="outline" size="sm" icon={<ArrowRight size={15} />} asChild><Link href={`/buses/${bus.id}`}>View ride</Link></Button></div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
