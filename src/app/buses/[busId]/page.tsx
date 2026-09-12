import Link from 'next/link'
import { ArrowLeft, BusFront, Clock, MapPin } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { getBusById } from '@/services/busService'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'

export const dynamic = 'force-dynamic'

export default async function BusDetailsPage({ params }: { params: Promise<{ busId: string }> }) {
  const { busId } = await params
  const bus = await getBusById(busId)
  if (!bus) return <div className="section-gap"><Container><Card><h1 className="text-h2">Bus ride not found</h1><p className="mt-2 text-[var(--color-text-secondary)]">This bus ride is no longer available.</p><Button className="mt-6" asChild><Link href="/buses">Back to buses</Link></Button></Card></Container></div>
  return <div className="section-gap bg-[var(--color-background)]"><Container className="max-w-3xl"><Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/buses">Back to buses</Link></Button><Card className="mt-6" padding="lg"><div className="flex items-start gap-4"><div className="rounded-[var(--radius-md)] bg-[var(--color-secondary-soft)] p-4 text-[var(--color-accent)]"><BusFront size={28} /></div><div><p className="text-sm font-semibold text-[var(--color-accent)]">Bus service</p><h1 className="mt-1 text-h1 text-[var(--color-text-primary)]">{bus.operator}</h1><p className="mt-2 text-[var(--color-text-secondary)]">{bus.busType}</p></div></div><div className="mt-8 grid gap-5 border-y border-[var(--color-border-light)] py-6 sm:grid-cols-3"><div><p className="text-sm text-[var(--color-text-secondary)]">Departure</p><p className="mt-1 text-xl font-bold">{bus.departure}</p><p className="text-sm">{bus.from}</p></div><div><p className="text-sm text-[var(--color-text-secondary)]">Journey</p><p className="mt-1 flex items-center gap-2 font-semibold"><Clock size={16} />{bus.duration}</p></div><div><p className="text-sm text-[var(--color-text-secondary)]">Arrival</p><p className="mt-1 text-xl font-bold">{bus.arrival}</p><p className="text-sm">{bus.to}</p></div></div><div className="mt-6 flex items-center justify-between gap-4"><div><p className="text-sm text-[var(--color-text-secondary)]">Fare</p><p className="text-2xl font-bold">{bus.price}</p></div></div><TravelRazorpayCheckout itemType="bus" itemId={bus.id} amount={Number(bus.price.replace(/[^0-9.]/g, ''))} quantityLabel="Seats" label={`${bus.operator} bus booking`} /><p className="mt-8 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><MapPin size={15} />Live schedule from the backend database.</p></Card></Container></div>
}
