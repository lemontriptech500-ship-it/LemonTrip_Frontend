import { mockBuses } from '@/data/buses'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface BusSearchResult {
  buses: typeof mockBuses
  total: number
}

export async function searchBuses(params: {
  from?: string
  to?: string
  date?: string
}): Promise<BusSearchResult> {
  if (isApiConfigured) return apiRequest<BusSearchResult>(`/buses/search?${new URLSearchParams(params as Record<string, string>).toString()}`)
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...mockBuses]

  if (params.from) {
    results = results.filter((b) =>
      b.from.toLowerCase().includes(params.from!.toLowerCase())
    )
  }
  if (params.to) {
    results = results.filter((b) =>
      b.to.toLowerCase().includes(params.to!.toLowerCase())
    )
  }

  return { buses: results, total: results.length }
}

export async function getBusById(id: string) {
  if (isApiConfigured) return apiRequest<(typeof mockBuses)[number] | null>(`/buses/${encodeURIComponent(id)}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBuses.find((b) => b.id === id) || null
}

export async function createBusBooking(data: {
  busId: string
  seats: string[]
  passenger: { name: string; email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/buses', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-BS-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
