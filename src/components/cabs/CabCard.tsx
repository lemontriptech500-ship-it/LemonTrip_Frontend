import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CarFront, Fuel, UsersRound } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { CabOption } from '@/services/cabService'

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export function CabCard({ cab }: { cab: CabOption }) {
  const imageStyle = cab.imageUrl ? { backgroundImage: `linear-gradient(0deg, rgba(4, 36, 25, .48), transparent 72%), url("${cab.imageUrl.replaceAll('"', '')}")` } : undefined

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0" hover>
      <div className="relative h-48 bg-gradient-to-br from-[#dce9e2] to-[#a8c7b5] bg-cover bg-center" style={imageStyle}>
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[var(--green-dark)]">{cab.category}</span>
        <CarFront size={54} className="absolute bottom-5 right-5 text-white/90 drop-shadow" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[var(--green-dark)]">{cab.name}</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{cab.city}</p>
          </div>
          <p className="shrink-0 text-right text-sm font-semibold text-[var(--green-dark)]">
            ₹{inr.format(Number(cab.pricePerKm))}<span className="font-normal text-[var(--color-text-secondary)]">/km</span>
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[var(--color-border-light)] py-4 text-sm text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-2"><UsersRound size={16} /> {cab.passengerCapacity} passengers</span>
          <span className="flex items-center gap-2"><BriefcaseBusiness size={16} /> {cab.luggageCapacity} bags</span>
          <span className="flex items-center gap-2"><Fuel size={16} /> {cab.fuelType}</span>
          <span className="flex items-center gap-2"><CarFront size={16} /> {cab.transmission}</span>
        </div>

        {cab.features.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">
          {cab.features.slice(0, 3).map((feature) => <li key={feature} className="rounded-full bg-[var(--color-background-soft)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]">{feature}</li>)}
        </ul>}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">₹{inr.format(Number(cab.baseFare))} base fare</p>
          <Button variant="outline" size="sm" icon={<ArrowRight size={15} />} asChild>
            <Link href={`/cabs/${encodeURIComponent(cab.id)}`}>View and book</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
