'use client'

import { useEffect, useState } from 'react'
import { Plane, Bus, Hotel, TrainFront, Package, FileText } from 'lucide-react'
import { Container, Card, Badge } from '@/components/ui'
import { getUserBookings, type Booking } from '@/services/bookingService'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatReference(booking: Booking) {
  if (booking.bookingReference) return booking.bookingReference
  return `LT-${booking.id.replace(/-/g, '').slice(0, 8).toUpperCase()}`
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
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <h1 className="text-h1">My Bookings</h1>
        {loading && <p className="mt-6 text-sm text-[var(--color-text-muted)]">Loading bookings...</p>}
        {error && <p className="mt-6 text-sm text-[var(--color-error)]">{error}</p>}
        {!loading && !error && bookings.length === 0 && (
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">No bookings found.</p>
        )}
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => {
            const meta = TYPE_META[booking.type]
            const Icon = meta?.icon ?? Package
            return (
              <Card key={booking.id} className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta?.className ?? 'bg-slate-50 text-slate-700'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        {meta?.label ?? booking.type}
                      </span>
                    </div>
                    <h2 className="font-semibold">{booking.title}</h2>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {formatDate(booking.date)} · {formatReference(booking)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge>
                  <p className="mt-1 font-semibold">₹{booking.amount.toLocaleString('en-IN')}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </div>
  )
}