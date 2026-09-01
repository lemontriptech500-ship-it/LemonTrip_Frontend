import React from 'react'
import Link from 'next/link'
import type { Hotel, HotelBookingData } from '@/types/hotels'
import { MEAL_PLAN_LABELS, PROPERTY_TYPE_LABELS } from '@/types/hotels'
import {
  calculateAccommodationTotal,
  calculateSelectionsTotal,
  formatStayDate,
  resolveSelection,
} from '@/lib/hotelUtils'
import { formatCurrency } from '@/lib/utils'

interface HotelReviewDetailsProps {
  hotel: Hotel
  booking: HotelBookingData
  query: string
}

export function HotelReviewDetails({ hotel, booking, query }: HotelReviewDetailsProps) {
  const items = booking.selections.flatMap((selection) => {
    const resolved = resolveSelection(hotel, selection)
    return resolved ? [{ ...resolved, quantity: selection.quantity }] : []
  })

  const total = calculateSelectionsTotal(
    items.map((item) => ({ pricePerNight: item.rate.pricePerNight, quantity: item.quantity })),
    booking.nightCount,
    hotel.currency
  )

  const primaryGuest = booking.guests?.[0]
  const contact = booking.contact
  const checkInLabel = formatStayDate(booking.checkIn) || booking.checkIn
  const checkOutLabel = formatStayDate(booking.checkOut) || booking.checkOut

  return (
    <div className="space-y-6">
      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Stay details</h2>
            <p className="mt-2 font-medium text-[var(--color-text-primary)]">{hotel.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {PROPERTY_TYPE_LABELS[hotel.propertyType]} · {hotel.location.area}, {hotel.location.city}
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              {checkInLabel} – {checkOutLabel}
              <br />
              {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} · {booking.roomsRequested}{' '}
              {booking.roomsRequested === 1 ? 'room' : 'rooms'} · {booking.adults}{' '}
              {booking.adults === 1 ? 'adult' : 'adults'}
              {booking.children > 0
                ? ` · ${booking.children} ${booking.children === 1 ? 'child' : 'children'}`
                : ''}
            </p>
          </div>
          <Link
            className="shrink-0 text-sm font-medium text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            href={`/hotels/${hotel.id}?${query}`}
          >
            Edit rooms
          </Link>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Selected rooms</h2>
        <div className="mt-4 space-y-4">
          {items.map((item) => {
            const subtotal = calculateAccommodationTotal(
              item.rate.pricePerNight,
              booking.nightCount,
              item.quantity,
              item.rate.currency
            )

            return (
              <div
                key={`${item.room.id}-${item.rate.id}`}
                className="border-t border-[var(--color-border-light)] pt-4 first:border-0 first:pt-0"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {item.quantity}× {item.room.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {MEAL_PLAN_LABELS[item.rate.mealPlan]} · {item.rate.refundable ? 'Refundable' : 'Non-refundable'}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{item.rate.cancellationPolicy}</p>
                  </div>
                  <div className="text-sm sm:text-right shrink-0">
                    <p>{formatCurrency(item.rate.pricePerNight, item.rate.currency)} / night</p>
                    <p className="text-[var(--color-text-secondary)]">
                      × {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} × {item.quantity}{' '}
                      {item.quantity === 1 ? 'room' : 'rooms'}
                    </p>
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {formatCurrency(subtotal.accommodationTotal, item.rate.currency)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Guest information</h2>
            {primaryGuest && (
              <p className="mt-2 text-[var(--color-text-primary)]">
                {primaryGuest.firstName} {primaryGuest.lastName}
              </p>
            )}
          </div>
          <Link
            className="shrink-0 text-sm font-medium text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            href={`/hotels/${hotel.id}/guests?${query}`}
          >
            Edit guest details
          </Link>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Contact information</h2>
        {contact && (
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {contact.email}
            <br />
            {contact.phoneCode} {contact.phoneNumber}
          </p>
        )}
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Important booking information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
          <li>Check-in from {hotel.checkInTime}. Check-out by {hotel.checkOutTime}.</li>
          {items.map((item) => (
            <li key={`${item.room.id}-${item.rate.id}-policy`}>
              {item.room.name} ({item.rate.name}): {item.rate.refundable ? 'Refundable. ' : 'Non-refundable. '}
              {item.rate.cancellationPolicy}
            </li>
          ))}
        </ul>
      </section>

      <p className="sr-only">
        Accommodation total {formatCurrency(total.accommodationTotal, hotel.currency)}. No taxes, service fees, or
        discounts added.
      </p>
    </div>
  )
}
