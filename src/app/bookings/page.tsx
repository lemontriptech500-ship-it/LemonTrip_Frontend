'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, ChevronRight, ReceiptText, Plane, Bus, Hotel, TrainFront, Package, FileText } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/ui'
import { getUserBookings, type Booking } from '@/services/bookingService'
import { formatCurrency } from '@/lib/utils'

function formatBookingDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function getBookingReference(booking: Booking) {
  if (booking.bookingReference) return booking.bookingReference
  return `LT-${booking.id.replace(/-/g, '').slice(0, 8).toUpperCase()}`
}

function getStatusVariant(status: Booking['status']) {
  if (status === 'confirmed' || status === 'completed') return 'success' as const
  if (status === 'cancelled') return 'error' as const
  return 'warning' as const
}

const TYPE_META: Record<Booking['type'], { label: string; icon: typeof Plane; className: string }> = {
  flight: { label: 'Flight', icon: Plane, className: 'bg-blue-50 text-blue-700' },
  bus: { label: 'Bus', icon: Bus, className: 'bg-amber-50 text-amber-700' },
  hotel: { label: 'Hotel', icon: Hotel, className: 'bg-purple-50 text-purple-700' },
  train: { label: 'Train', icon: TrainFront, className: 'bg-teal-50 text-teal-700' },
  package: { label: 'Package', icon: Package, className: 'bg-pink-50 text-pink-700' },
  visa: { label: 'Visa', icon: FileText, className: 'bg-slate-50 text-slate-700' },
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUserBookings()
      .then(setBookings)
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load bookings.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="section-gap min-h-screen bg-[var(--color-background)]">
      <Container>
        <div className="flex flex-col gap-2 border-b border-[var(--color-border-light)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">Your travel activity</p>
            <h1 className="mt-2 text-h1 text-[var(--color-text-primary)]">My bookings</h1>
            <p className="mt-2 max-w-xl text-sm text-[var(--color-text-secondary)]">Review your trips, payment status, and booking references in one place.</p>
          </div>
          {!loading && !error && bookings.length > 0 && <p className="text-sm text-[var(--color-text-muted)]">{bookings.length} booking{bookings.length === 1 ? '' : 's'}</p>}
        </div>

        {loading && <p className="mt-8 text-sm text-[var(--color-text-muted)]">Loading bookings...</p>}
        {error && <p className="mt-8 text-sm text-[var(--color-error)]">{error}</p>}
        {!loading && !error && bookings.length === 0 && <p className="mt-8 text-sm text-[var(--color-text-muted)]">No bookings found.</p>}

        {!loading && !error && bookings.length > 0 && (
          <div className="mt-8 space-y-4">
            {bookings.map((booking) => {
              const meta = TYPE_META[booking.type]
              const Icon = meta?.icon ?? Package
              return (
                <Card key={booking.id} className="overflow-hidden p-0">
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta?.className ?? 'bg-slate-50 text-slate-700'}`}>
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="neutral">{meta?.label ?? booking.type}</Badge>
                          <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                        </div>
                        <h2 className="mt-3 truncate text-lg font-semibold text-[var(--color-text-primary)]">{booking.title}</h2>
                        <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-text-secondary)] sm:flex-row sm:flex-wrap sm:gap-x-5">
                          <span className="inline-flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />Booked on {formatBookingDate(booking.date)}</span>
                          <span className="inline-flex items-center gap-2"><ReceiptText size={16} aria-hidden="true" />Reference: <strong className="font-mono text-[var(--color-text-primary)]">{getBookingReference(booking)}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 border-t border-[var(--color-border-light)] pt-4 sm:min-w-40 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                      <div className="sm:text-right">
                        <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Total paid</p>
                        <p className="mt-1 text-lg font-bold text-[var(--color-text-primary)]">{formatCurrency(booking.amount)}</p>
                      </div>
                      <Button variant="outline" size="sm" icon={<ChevronRight size={16} />} aria-label={`View ${booking.title}`}>
                        View details
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
