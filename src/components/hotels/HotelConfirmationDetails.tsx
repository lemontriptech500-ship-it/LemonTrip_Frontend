import React from 'react'
import type { Hotel, HotelBookingData } from '@/types/hotels'
import { MEAL_PLAN_LABELS, PROPERTY_TYPE_LABELS } from '@/types/hotels'
import {
  calculateAccommodationTotal,
  calculateSelectionsTotal,
  formatStayDate,
  resolveSelection,
} from '@/lib/hotelUtils'
import { formatCurrency } from '@/lib/utils'

interface HotelConfirmationDetailsProps {
  hotel: Hotel
  booking: HotelBookingData
}

export function HotelConfirmationDetails({ hotel, booking }: HotelConfirmationDetailsProps) {
  const selections = booking.selections.flatMap((selection) => {
    const resolved = resolveSelection(hotel, selection)
    return resolved ? [{ ...resolved, quantity: selection.quantity }] : []
  })
  const total = calculateSelectionsTotal(
    selections.map((item) => ({ pricePerNight: item.rate.pricePerNight, quantity: item.quantity })),
    booking.nightCount,
    hotel.currency
  )
  const guest = booking.guests?.[0]
  const contact = booking.contact

  return (
    <div className="space-y-6">
      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Stay details</h2>
        <p className="mt-2 font-medium text-[var(--color-text-primary)]">{hotel.name}</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {PROPERTY_TYPE_LABELS[hotel.propertyType]} · {hotel.location.area}, {hotel.location.city}
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--color-text-secondary)]">Check-in</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">{formatStayDate(booking.checkIn)}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-secondary)]">Check-out</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">{formatStayDate(booking.checkOut)}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-secondary)]">Stay</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">
              {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} · {booking.roomsRequested}{' '}
              {booking.roomsRequested === 1 ? 'room' : 'rooms'}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-secondary)]">Guests</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">
              {booking.adults} {booking.adults === 1 ? 'adult' : 'adults'}
              {booking.children > 0 ? ` · ${booking.children} ${booking.children === 1 ? 'child' : 'children'}` : ''}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-secondary)]">Check-in time</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">{hotel.checkInTime}</dd>
          </div>
          <div>
            <dt className="text-[var(--color-text-secondary)]">Check-out time</dt>
            <dd className="font-medium text-[var(--color-text-primary)]">{hotel.checkOutTime}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Selected rooms</h2>
        <div className="mt-4 space-y-5">
          {selections.map((item) => {
            const subtotal = calculateAccommodationTotal(
              item.rate.pricePerNight,
              booking.nightCount,
              item.quantity,
              item.rate.currency
            )
            return (
              <article key={`${item.room.id}-${item.rate.id}`} className="border-t border-[var(--color-border-light)] pt-4 first:border-0 first:pt-0">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-medium text-[var(--color-text-primary)]">
                      {item.quantity}× {item.room.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {MEAL_PLAN_LABELS[item.rate.mealPlan]} · {item.rate.refundable ? 'Refundable' : 'Non-refundable'}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{item.rate.cancellationPolicy}</p>
                  </div>
                  <div className="shrink-0 text-sm sm:text-right">
                    <p>{formatCurrency(item.rate.pricePerNight, item.rate.currency)} / night</p>
                    <p className="text-[var(--color-text-secondary)]">
                      {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} × {item.quantity}{' '}
                      {item.quantity === 1 ? 'room' : 'rooms'}
                    </p>
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {formatCurrency(subtotal.accommodationTotal, item.rate.currency)}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Guest and contact details</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-[var(--color-text-secondary)]">Primary guest</p>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{guest?.firstName} {guest?.lastName}</p>
          </div>
          <div>
            <p className="text-[var(--color-text-secondary)]">Email</p>
            <p className="mt-1 break-words font-medium text-[var(--color-text-primary)]">{contact?.email}</p>
          </div>
          <div>
            <p className="text-[var(--color-text-secondary)]">Phone</p>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{contact?.phoneCode} {contact?.phoneNumber}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Accommodation total</h2>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {booking.nightCount} {booking.nightCount === 1 ? 'night' : 'nights'} across {booking.roomsRequested}{' '}
            {booking.roomsRequested === 1 ? 'room' : 'rooms'}
          </span>
          <span className="text-2xl font-bold text-[var(--color-text-primary)]">
            {formatCurrency(total.accommodationTotal, hotel.currency)}
          </span>
        </div>
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">No taxes, service fees, or discounts added.</p>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Important stay information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
          <li>Check-in from {hotel.checkInTime}. Check-out by {hotel.checkOutTime}.</li>
          {selections.map((item) => (
            <li key={`${item.room.id}-${item.rate.id}-policy`}>
              {item.room.name}: {item.rate.refundable ? 'Refundable. ' : 'Non-refundable. '}{item.rate.cancellationPolicy}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
