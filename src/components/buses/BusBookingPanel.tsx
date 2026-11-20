'use client'

import { CatalogBookingPanel } from '@/components/booking/CatalogBookingPanel'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'

interface BusBookingPanelProps {
  busId: string
  title: string
  price: number
  currency?: string
  date?: string
  busType: string
}

export function BusBookingPanel({ busId, title, price, currency = 'INR', date, busType }: BusBookingPanelProps) {
  // Mock entries have no matching server inventory/payment record. Keep those
  // explicitly in the preview flow; database-backed buses can use Razorpay.
  if (busId.startsWith('bus-')) {
    return <CatalogBookingPanel title={title} price={price} currency={currency} date={date} options={[busType]} optionLabel="Bus type" quantityLabel="Seats" />
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
      <p className="text-sm text-[var(--color-text-secondary)]">Fare per seat</p>
      <p className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">{new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)}</p>
      <TravelRazorpayCheckout
        itemType="bus"
        itemId={busId}
        amount={price}
        currency={currency}
        initialQuantity={1}
        quantityLabel="Seats"
        label={title}
        extraDetails={{ travelDate: date || '', busType }}
      />
    </div>
  )
}
