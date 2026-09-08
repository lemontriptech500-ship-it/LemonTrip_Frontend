import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface Booking {
  id: string
  type: 'flight' | 'hotel' | 'bus' | 'train' | 'package' | 'visa'
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed'
  title: string
  date: string
  amount: number
  details: Record<string, string>
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'LT-FL-A1B2C3',
    type: 'flight',
    status: 'confirmed',
    title: 'Delhi to Mumbai - IndiGo 6E-201',
    date: '2026-09-15',
    amount: 4500,
    details: {
      airline: 'IndiGo',
      flightNumber: '6E-201',
      departure: '06:00',
      arrival: '08:15',
      class: 'Economy',
    },
  },
  {
    id: 'LT-HT-D4E5F6',
    type: 'hotel',
    status: 'confirmed',
    title: 'The Grand Imperial, Delhi',
    date: '2026-09-20',
    amount: 8200,
    details: {
      hotel: 'The Grand Imperial',
      city: 'Delhi',
      checkIn: '2026-09-20',
      checkOut: '2026-09-22',
      room: 'Deluxe Room',
    },
  },
  {
    id: 'LT-BS-G7H8I9',
    type: 'bus',
    status: 'completed',
    title: 'Delhi to Jaipur - Volvo AC',
    date: '2026-08-25',
    amount: 1200,
    details: {
      operator: 'Yellow Line Travels',
      busType: 'Volvo AC Sleeper',
      departure: '22:00',
      arrival: '05:30',
    },
  },
  {
    id: 'LT-PK-J1K2L3',
    type: 'package',
    status: 'pending',
    title: 'Swiss Alps Adventure - 7 Days',
    date: '2026-10-15',
    amount: 85000,
    details: {
      destination: 'Swiss Alps',
      duration: '7 Days / 6 Nights',
      startDate: '2026-10-15',
      travellers: '2 Adults',
    },
  },
]

export async function getUserBookings(): Promise<Booking[]> {
  if (isApiConfigured) return apiRequest<Booking[]>('/bookings')
  await new Promise((resolve) => setTimeout(resolve, 600))
  return MOCK_BOOKINGS
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (isApiConfigured) return apiRequest<Booking | null>(`/bookings/${encodeURIComponent(id)}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_BOOKINGS.find((b) => b.id === id) || null
}

export async function cancelBooking(id: string, reason: string): Promise<{
  success: boolean
  refundAmount: number
  cancellationFee: number
}> {
  if (isApiConfigured) return apiRequest(`/bookings/${encodeURIComponent(id)}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) })
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const booking = MOCK_BOOKINGS.find((b) => b.id === id)
  if (!booking) {
    return { success: false, refundAmount: 0, cancellationFee: 0 }
  }

  booking.status = 'cancelled'
  const cancellationFee = Math.round(booking.amount * 0.1)
  const refundAmount = booking.amount - cancellationFee

  return { success: true, refundAmount, cancellationFee }
}

export async function getUserStats(): Promise<{
  totalBookings: number
  upcomingTrips: number
  cancelledTrips: number
  totalSpent: number
}> {
  if (isApiConfigured) return apiRequest('/bookings/stats')
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    totalBookings: MOCK_BOOKINGS.length,
    upcomingTrips: MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length,
    cancelledTrips: MOCK_BOOKINGS.filter((b) => b.status === 'cancelled').length,
    totalSpent: MOCK_BOOKINGS.reduce((sum, b) => sum + b.amount, 0),
  }
}

export async function confirmBooking(data: Record<string, unknown>): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/confirm', { method: 'POST', body: JSON.stringify(data) })
  return { bookingId: `LT-DEMO-${Date.now().toString(36).toUpperCase()}`, status: 'confirmed' }
}
