import { MOCK_HOTELS, getHotelById } from '@/data/hotels'
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
  if (isApiConfigured) return apiRequest<HotelSearchResult>(`/hotels/search?${new URLSearchParams(params as unknown as Record<string, string>).toString()}`)
  await new Promise((resolve) => setTimeout(resolve, 800))

  let results = [...MOCK_HOTELS]

  if (params.destination) {
    const dest = params.destination.toLowerCase()
    results = results.filter(
      (h) =>
        h.name.toLowerCase().includes(dest) ||
        h.location.city.toLowerCase().includes(dest) ||
        h.location.area.toLowerCase().includes(dest)
    )
  }

  const propertyTypes = [...new Set(results.map((h) => h.propertyType))]
  const allAmenities = results.flatMap((h) => h.amenities)
  const amenities = [...new Set(allAmenities)]
  const prices = results.map((h) => h.startingPrice || 0)

  return {
    hotels: results,
    total: results.length,
    filters: {
      propertyTypes,
      amenities,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    },
  }
}

export async function getHotel(id: string): Promise<Hotel | null> {
  if (isApiConfigured) return apiRequest<Hotel | null>(`/hotels/${encodeURIComponent(id)}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return getHotelById(id) ?? null
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
