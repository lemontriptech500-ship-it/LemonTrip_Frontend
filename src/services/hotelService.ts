import type { Hotel, HotelFiltersState, HotelSearchParams, HotelSortOption } from '@/types/hotels'
import { apiRequest, isApiConfigured } from '@/lib/apiClient'

export interface HotelSearchResult {
  hotels: Hotel[]
  total: number
  filters: {
    propertyTypes: string[]
    amenities: string[]
    minPrice: number
    maxPrice: number
  }
}

export async function searchHotels(params: HotelSearchParams): Promise<HotelSearchResult> {
  const query = new URLSearchParams({ destination: params.destination })
  return apiRequest<HotelSearchResult>(`/hotels/search?${query.toString()}`)
}

export async function getHotel(id: string): Promise<Hotel | null> {
  try {
    return await apiRequest<Hotel>(`/hotels/${encodeURIComponent(id)}`)
  } catch {
    return null
  }
}

export async function filterHotels(
  hotels: Hotel[],
  filters: HotelFiltersState,
  sort: HotelSortOption = 'recommended'
): Promise<Hotel[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let results = [...hotels]

  if (filters.starRating.length > 0) {
    results = results.filter((h) => filters.starRating.includes(h.starRating))
  }

  if (filters.propertyType.length > 0) {
    results = results.filter((h) => filters.propertyType.includes(h.propertyType))
  }

  if (filters.amenities.length > 0) {
    results = results.filter((h) =>
      filters.amenities.every((a) => h.amenities.includes(a))
    )
  }

  if (filters.priceRange) {
    results = results.filter((h) => {
      const price = h.startingPrice || 0
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })
  }

  if (filters.refundable) {
    results = results.filter((h) =>
      h.rooms.some((r) => r.rates.some((rate) => rate.refundable))
    )
  }

  if (filters.guestRatingMin) {
    results = results.filter((h) => h.guestRating >= filters.guestRatingMin!)
  }

  switch (sort) {
    case 'price_asc':
      results.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0))
      break
    case 'price_desc':
      results.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0))
      break
    case 'rating_desc':
      results.sort((a, b) => b.guestRating - a.guestRating)
      break
    case 'star_desc':
      results.sort((a, b) => b.starRating - a.starRating)
      break
    case 'reviews_desc':
      results.sort((a, b) => b.guestReviewCount - a.guestReviewCount)
      break
    case 'recommended':
    default:
      results.sort((a, b) => b.guestRating - a.guestRating)
      break
  }

  return results
}

export async function createHotelBooking(data: {
  hotelId: string
  rooms: unknown[]
  guests: unknown[]
  contact: { email: string; phone: string }
}): Promise<{ bookingId: string; status: string }> {
  if (isApiConfigured) return apiRequest('/bookings/hotels', { method: 'POST', body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    bookingId: `LT-HT-${Date.now().toString(36).toUpperCase()}`,
    status: 'confirmed',
  }
}
