import { mockTrains } from '@/data/trains'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface TrainPassenger {
  name: string
  age: number
  gender: string
  berthPreference?: string
  nationality?: string
  identity?: { type?: string; number?: string }
}

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
    } catch (error) {
      if (process.env.NODE_ENV === 'production') throw error
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
    } catch (error) {
      if (process.env.NODE_ENV === 'production') throw error
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTrains.find((t) => t.id === id) || null
}

export async function createTrainBooking(data: {
  trainId: string
  trainClass: string
  passengers: TrainPassenger[]
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  return apiRequest('/bookings/trains', { method: 'POST', body: JSON.stringify(data) })
}

export function checkTrainAvailability(data: { trainId: string; journeyDate?: string; trainClass: string; passengers: number }) {
  return apiRequest<{ available: number; fare: number; currency: string }>('/trains/availability', { method: 'POST', body: JSON.stringify(data) })
}

export function getTrainBookingStatus(id: string) {
  return apiRequest<{ status: string; pnr?: string | null; supplierStatus?: string | null }>(`/trains/bookings/${encodeURIComponent(id)}/status`)
}

export function getTrainPnrStatus(pnr: string) {
  return apiRequest<{ pnr: string; status: string; passengers: unknown[] }>(`/trains/pnr/${encodeURIComponent(pnr)}`)
}

export function cancelTrainBooking(providerReference: string) {
  return apiRequest<{ status: string; refundAmount?: number }>(`/trains/bookings/${encodeURIComponent(providerReference)}/cancel`, { method: 'POST' })
}
