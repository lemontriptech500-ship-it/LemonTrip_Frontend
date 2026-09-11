import { apiRequest, isApiConfigured } from '@/lib/apiClient'
import type { BusOption } from '@/data/buses'

export interface BusSearchResult {
  buses: BusOption[]
  total: number
}

export async function searchBuses(params: {
  from?: string
  to?: string
  date?: string
}): Promise<BusSearchResult> {
  return apiRequest<BusSearchResult>(`/buses/search?${new URLSearchParams(params as Record<string, string>).toString()}`)
}

export async function getBusById(id: string): Promise<BusOption | null> {
  try {
    return await apiRequest<BusOption>(`/buses/${encodeURIComponent(id)}`)
  } catch {
    return null
  }
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
