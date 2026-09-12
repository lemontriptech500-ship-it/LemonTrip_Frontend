import { mockTrains } from '@/data/trains'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface TrainSearchResult {
  trains: typeof mockTrains
  total: number
}

export async function searchTrains(params: {
  from?: string
  to?: string
  date?: string
  trainClass?: string
  quota?: string
}): Promise<TrainSearchResult> {
  if (isApiConfigured) {
    try {
      return await apiRequest<TrainSearchResult>(`/trains/search?${new URLSearchParams(params as Record<string, string>).toString()}`, { suppressErrorLog: true })
    } catch {
      // Fall through to the local catalog while the API is unavailable.
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...mockTrains]

  if (params.from) {
    results = results.filter((t) =>
      t.from.toLowerCase().includes(params.from!.toLowerCase())
    )
  }
  if (params.to) {
    results = results.filter((t) =>
      t.to.toLowerCase().includes(params.to!.toLowerCase())
    )
  }

  return { trains: results, total: results.length }
}

export async function getTrainById(id: string) {
  if (isApiConfigured) {
    try {
      return await apiRequest<(typeof mockTrains)[number] | null>(`/trains/${encodeURIComponent(id)}`, { suppressErrorLog: true })
    } catch {
      // Fall through to the local catalog while the API is unavailable.
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTrains.find((t) => t.id === id) || null
}

export async function createTrainBooking(data: {
  trainId: string
  trainClass: string
  passengers: unknown[]
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/trains', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-TR-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
