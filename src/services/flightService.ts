import { MOCK_FLIGHTS } from '@/data/flights'
import type { Flight, FlightFiltersState, SortOption } from '@/types/flights'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface FlightSearchResult {
  flights: Flight[]
  total: number
  filters: {
    airlines: string[]
    minPrice: number
    maxPrice: number
  }
}

export async function searchFlights(params: {
  from?: string
  to?: string
  departureDate?: string
  returnDate?: string
  passengers?: string
  class?: string
}): Promise<FlightSearchResult> {
  if (isApiConfigured) return apiRequest<FlightSearchResult>(`/flights/search?${new URLSearchParams(params as Record<string, string>).toString()}`)
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...MOCK_FLIGHTS]

  if (params.from) {
    results = results.filter((f) =>
      f.origin.toLowerCase().includes(params.from!.toLowerCase())
    )
  }
  if (params.to) {
    results = results.filter((f) =>
      f.destination.toLowerCase().includes(params.to!.toLowerCase())
    )
  }

  const airlines = [...new Set(results.map((f) => f.airline))]
  const prices = results.map((f) => f.price)

  return {
    flights: results,
    total: results.length,
    filters: {
      airlines,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    },
  }
}

export async function getFlightById(id: string): Promise<Flight | null> {
  if (isApiConfigured) return apiRequest<Flight | null>(`/flights/${encodeURIComponent(id)}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_FLIGHTS.find((f) => f.id === id) || null
}

export async function filterFlights(
  flights: Flight[],
  filters: FlightFiltersState,
  sort: SortOption = 'recommended'
): Promise<Flight[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let results = [...flights]

  if (filters.stops.length > 0) {
    results = results.filter((f) => filters.stops.includes(f.stops))
  }

  if (filters.airlines.length > 0) {
    results = results.filter((f) => filters.airlines.includes(f.airline))
  }

  if (filters.priceRange) {
    results = results.filter(
      (f) => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    )
  }

  if (filters.refundable) {
    results = results.filter((f) => f.refundable)
  }

  switch (sort) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      results.sort((a, b) => b.price - a.price)
      break
    case 'duration_asc':
      results.sort((a, b) => a.durationMinutes - b.durationMinutes)
      break
    case 'departure_asc':
      results.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime())
      break
    case 'departure_desc':
      results.sort((a, b) => new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime())
      break
    case 'recommended':
    default:
      results.sort((a, b) => {
        const scoreA = a.price * 0.5 + a.durationMinutes * 0.3 + a.stops * 1000
        const scoreB = b.price * 0.5 + b.durationMinutes * 0.3 + b.stops * 1000
        return scoreA - scoreB
      })
      break
  }

  return results
}

export async function createFlightBooking(data: {
  flightId: string
  fareId: string
  travellers: unknown[]
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/flights', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-FL-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}

export interface RazorpayFlightOrder {
  orderId: string
  amount: number
  currency: string
  keyId: string
  bookingId: string
  bookingReference: string
}

export function createRazorpayFlightOrder(data: {
  flightId: string
  fareId: string
  travellers: unknown[]
  contact: unknown
}): Promise<RazorpayFlightOrder> {
  return apiRequest<RazorpayFlightOrder>('/payments/razorpay/flights/order', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function verifyRazorpayFlightPayment(data: {
  bookingId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}): Promise<{ bookingReference: string | null; status: string }> {
  return apiRequest<{ bookingReference: string | null; status: string }>('/payments/razorpay/flights/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
