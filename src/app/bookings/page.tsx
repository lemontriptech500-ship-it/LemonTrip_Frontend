'use client'

import { useEffect, useState } from 'react'
import { Container, Card, Badge } from '@/components/ui'
import { getUserBookings, type Booking } from '@/services/bookingService'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUserBookings().then(setBookings).catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load bookings.')).finally(() => setLoading(false))
  }, [])

  return <div className="section-gap bg-[var(--color-background)]"><Container><h1 className="text-h1">My Bookings</h1>{loading && <p className="mt-6 text-sm text-[var(--color-text-muted)]">Loading bookings...</p>}{error && <p className="mt-6 text-sm text-[var(--color-error)]">{error}</p>}{!loading && !error && bookings.length === 0 && <p className="mt-6 text-sm text-[var(--color-text-muted)]">No bookings found.</p>}<div className="mt-6 space-y-4">{bookings.map((booking) => <Card key={booking.id} className="flex items-center justify-between gap-4 p-5"><div><h2 className="font-semibold">{booking.title}</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">{booking.date} · {booking.id}</p></div><div className="text-right"><Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge><p className="mt-1 font-semibold">₹{booking.amount.toLocaleString('en-IN')}</p></div></Card>)}</div></Container></div>
}
