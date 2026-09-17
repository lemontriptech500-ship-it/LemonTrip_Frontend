import { apiRequest, isApiConfigured } from '@/lib/apiClient'
import type { HolidayPackage } from '@/data/packages'

export async function searchPackages(params: {
  destination?: string
  category?: 'national' | 'international'
  month?: string
  travellers?: string
}) {
  return apiRequest<{ packages: HolidayPackage[]; total: number }>(`/packages/search?${new URLSearchParams(params).toString()}`, { suppressErrorLog: true })
}

export async function getPackageById(id: string): Promise<HolidayPackage | null> {
  try {
    return await apiRequest<HolidayPackage>(`/packages/${encodeURIComponent(id)}`)
  } catch {
    return null
  }
}

export async function createPackageBooking(data: {
  packageId: string
  startDate: string
  travellers: number
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/packages', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-PK-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
