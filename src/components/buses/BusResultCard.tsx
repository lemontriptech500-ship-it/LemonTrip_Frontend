'use client'

import Link from 'next/link'
import { ArrowRight, BusFront, Clock, Heart } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useWishlistStore } from '@/store/wishlistStore'
import type { BusOption } from '@/data/buses'

interface BusResultCardProps {
  bus: BusOption
}

function parseBusPrice(price: string): number {
  const match = price.match(/[\d,]+/)
  if (!match) return 0
  return Number(match[0].replace(/,/g, '')) || 0
}

export function BusResultCard({ bus }: BusResultCardProps) {
  const { toggleItem, isWishlisted, hasHydrated } = useWishlistStore()
  const wishlistId = `bus-${bus.id}`
  const wishlisted = hasHydrated && isWishlisted(wishlistId)

  const handleToggleWishlist = () => {
    toggleItem({
      id: wishlistId,
      type: 'bus',
      name: bus.operator,
      description: `${bus.from} → ${bus.to} · ${bus.departure}–${bus.arrival} · ${bus.busType}`,
      price: parseBusPrice(bus.price),
      details: {
        busId: bus.id,
        from: bus.from,
        to: bus.to,
        departure: bus.departure,
        arrival: bus.arrival,
      },
    })
  }

  return (
    <Card className="relative flex h-full flex-col" hover>
      <button
        type="button"
        onClick={handleToggleWishlist}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wishlisted}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-[var(--color-error)]' : ''} />
      </button>

      <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border-light)] pb-5 pr-10">
        <div className="flex items-center gap-3">
          <div className="rounded-[var(--radius-md)] bg-[var(--color-primary)] p-3 text-[var(--green-dark)]">
            <BusFront size={22} />
          </div>
          <div>
            <h2 className="font-bold text-[var(--color-text-primary)]">{bus.operator}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{bus.busType}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[var(--color-primary)]">{bus.seatsLeft} seats left</span>
      </div>

      <div className="flex items-center justify-between gap-3 py-6">
        <div>
          <p className="text-xl font-bold text-[var(--color-text-primary)]">{bus.departure}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{bus.from}</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 text-xs text-[var(--color-text-secondary)]">
          <Clock size={14} />
          <span>{bus.duration}</span>
          <div className="h-px w-full bg-[var(--color-border)]" />
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[var(--color-text-primary)]">{bus.arrival}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{bus.to}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border-light)] pt-5">
        <span className="font-semibold text-[var(--color-text-primary)]">{bus.price}</span>
        <Button variant="outline" size="sm" icon={<ArrowRight size={15} />} asChild>
          <Link href={`/buses/${bus.id}`}>View ride</Link>
        </Button>
      </div>
    </Card>
  )
}