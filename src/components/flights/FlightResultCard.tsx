'use client'

import Link from 'next/link'
import { Flight } from '@/types/flights'
import { Badge } from '@/components/ui'
import { Plane, Briefcase, Heart, ChevronRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'

interface FlightResultCardProps {
  flight: Flight
}

/**
 * Figma "Flight & travel results" card:
 * airline tile + name, big times with a route line between them,
 * "per traveller" price on the left, dark-green Select button on the right.
 */
export function FlightResultCard({ flight }: FlightResultCardProps) {
  const { toggleItem, isWishlisted, hasHydrated } = useWishlistStore()
  const wishlistId = `flight-${flight.id}`
  const wishlisted = hasHydrated && isWishlisted(wishlistId)

  const formatTime = (isoString: string) =>
    new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  const formatDuration = (mins: number) => `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`

  const stopsLabel = flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`

  const handleToggleWishlist = () => {
    toggleItem({
      id: wishlistId,
      type: 'flight',
      name: `${flight.airline} ${flight.flightNumber}`,
      description: `${flight.origin} → ${flight.destination} · ${formatTime(flight.departureTime)}–${formatTime(flight.arrivalTime)} · ${stopsLabel}`,
      price: flight.price,
      details: {
        flightId: flight.id,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
      },
    })
  }

  return (
    <article className="relative rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] sm:p-6">
      {/* Airline row */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-sm font-extrabold text-[var(--green-dark)]">
          {flight.airlineCode}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-[var(--color-text-primary)]">{flight.airline}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{flight.flightNumber}</p>
        </div>
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-[var(--color-error)]' : ''} />
        </button>
      </div>

      {/* Times + route line */}
      <div className="mt-6 flex items-center gap-4">
        <div>
          <p className="text-3xl font-extrabold leading-none tracking-tight text-[var(--color-text-primary)]">
            {formatTime(flight.departureTime)}
          </p>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{flight.origin}</p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
          <span className="text-xs text-[var(--color-text-muted)]">
            {formatDuration(flight.durationMinutes)} · {stopsLabel}
          </span>
          <div className="flex w-full items-center gap-2">
            <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
            <Plane size={14} className="shrink-0 rotate-90 text-[var(--color-secondary)]" aria-hidden="true" />
            <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
          </div>
          {flight.stopLocations && flight.stopLocations.length > 0 && (
            <span className="text-[10px] text-[var(--color-text-muted)]">via {flight.stopLocations.join(', ')}</span>
          )}
        </div>

        <div className="text-right">
          <p className="text-3xl font-extrabold leading-none tracking-tight text-[var(--color-text-primary)]">
            {formatTime(flight.arrivalTime)}
          </p>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{flight.destination}</p>
        </div>
      </div>

      <div className="my-5 h-px bg-[var(--color-border-light)]" />

      {/* Price + Select */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow !text-[10px]">Per traveller · incl. taxes</p>
          <p className="mt-1 text-2xl font-extrabold text-[var(--color-text-primary)]">
            {flight.currency} {flight.price.toLocaleString()}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
              <Briefcase size={12} aria-hidden="true" /> {flight.baggageAllowance}
            </span>
            {flight.refundable ? <Badge variant="success">Refundable</Badge> : <Badge variant="neutral">Non-refundable</Badge>}
          </div>
        </div>

        <Link
          href={`/flights/${flight.id}`}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-[var(--radius-lg)] bg-[var(--green-dark)] px-7 text-sm font-bold text-white transition-colors hover:bg-[var(--green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        >
          Select
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}