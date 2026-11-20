import { API_BASE_URL } from '@/lib/apiClient'

export interface CabOption {
  id: string
  name: string
  city: string
  category: string
  passengerCapacity: number
  luggageCapacity: number
  transmission: string
  fuelType: string
  pricePerKm: number | string
  baseFare: number | string
  includedKm: number
  imageUrl: string | null
  features: string[]
}

export async function searchCabs(params: { city?: string; category?: string }): Promise<CabOption[]> {
  const query = new URLSearchParams()
  if (params.city?.trim()) query.set('city', params.city.trim())
  if (params.category?.trim()) query.set('category', params.category.trim())

  const response = await fetch(`${API_BASE_URL}/cabs/search${query.size ? `?${query}` : ''}`, { cache: 'no-store' })
  const payload = await response.json().catch(() => null)
  if (!response.ok || !payload?.success || !Array.isArray(payload.data?.cabs)) {
    throw new Error(payload?.error?.message || 'Cab listings are unavailable right now.')
  }
  return payload.data.cabs as CabOption[]
}

export async function getCabById(id: string): Promise<CabOption | null> {
  const response = await fetch(`${API_BASE_URL}/cabs/${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (response.status === 404) return null
  const payload = await response.json().catch(() => null)
  if (!response.ok || !payload?.success || !payload.data?.id) {
    throw new Error(payload?.error?.message || 'Cab details are unavailable right now.')
  }
  return payload.data as CabOption
}
