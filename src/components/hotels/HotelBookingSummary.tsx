import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import type { Hotel, HotelBookingData } from '@/types/hotels'
import { calculateSelectionsTotal, resolveSelection } from '@/lib/hotelUtils'
import { formatCurrency } from '@/lib/utils'

interface HotelBookingSummaryProps {
  hotel: Hotel
  booking: HotelBookingData
  query: string
  continueAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
    hint?: string
  }
}

export function HotelBookingSummary({ hotel, booking, query, continueAction }: HotelBookingSummaryProps) {
  const selected = booking.selections.flatMap((selection) => {
    const resolved = resolveSelection(hotel, selection)
    return resolved ? [{ ...resolved, quantity: selection.quantity }] : []
  })

  const total = calculateSelectionsTotal(
    selected.map((item) => ({ pricePerNight: item.rate.pricePerNight, quantity: item.quantity })),
    booking.nightCount,
    hotel.currency
  )

  return (
    <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 lg:sticky lg:top-24">
      <h2 className="font-bold text-[var(--color-text-primary)]">Price summary</h2>
      <p className="mt-2 font-medium text-[var(--color-text-primary)]">{hotel.name}</p>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {hotel.location.area}, {hotel.location.city}
      </p>
      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
        {booking.checkIn} – {booking.checkOut}
        <br />
        {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} · {booking.roomsRequested}{' '}
        {booking.roomsRequested === 1 ? 'room' : 'rooms'}
      </p>
      {booking.guests?.[0] && (
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          Guest: <span className="font-medium text-[var(--color-text-primary)]">{booking.guests[0].firstName} {booking.guests[0].lastName}</span>
        </p>
      )}

      <div className="my-4 space-y-2 border-y border-[var(--color-border-light)] py-4">
        {selected.map((item) => (
          <p key={`${item.room.id}-${item.rate.id}`} className="text-sm">
            <span className="font-medium">
              {item.quantity}× {item.room.name}
            </span>
            <br />
            <span className="text-[var(--color-text-secondary)]">{item.rate.name}</span>
          </p>
        ))}
      </div>

      <div className="flex justify-between gap-3">
        <span className="font-semibold text-[var(--color-text-primary)]">Accommodation total</span>
        <span className="font-bold text-[var(--color-text-primary)]">
          {formatCurrency(total.accommodationTotal, hotel.currency)}
        </span>
      </div>
      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">No taxes, service fees, or discounts added.</p>

      {continueAction ? (
        <div className="mt-5">
          <Button
            fullWidth
            onClick={continueAction.onClick}
            disabled={continueAction.disabled}
            aria-disabled={continueAction.disabled}
          >
            {continueAction.label}
          </Button>
          {continueAction.hint && (
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{continueAction.hint}</p>
          )}
        </div>
      ) : (
        <Link
          href={`/hotels/${hotel.id}?${query}`}
          className="mt-5 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          Edit rooms
        </Link>
      )}
    </aside>
  )
}
