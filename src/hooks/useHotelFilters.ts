import { useMemo, useState } from 'react'
import type { Hotel, HotelFiltersState, HotelSortOption } from '@/types/hotels'
import { getHotelStartingPrice } from '@/lib/hotelUtils'

export const DEFAULT_HOTEL_PRICE_MAX = 25000

export const DEFAULT_HOTEL_FILTERS: HotelFiltersState = {
  priceRange: [0, DEFAULT_HOTEL_PRICE_MAX],
  starRating: [],
  guestRatingMin: null,
  propertyType: [],
  amenities: [],
  mealPlan: [],
  refundable: null,
}

function hotelMatchesFilters(hotel: Hotel, filters: HotelFiltersState): boolean {
  const startingPrice = getHotelStartingPrice(hotel)

  if (startingPrice < filters.priceRange[0] || startingPrice > filters.priceRange[1]) {
    return false
  }

  if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
    return false
  }

  if (filters.guestRatingMin !== null && hotel.guestRating < filters.guestRatingMin) {
    return false
  }

  if (filters.propertyType.length > 0 && !filters.propertyType.includes(hotel.propertyType)) {
    return false
  }

  if (filters.amenities.length > 0 && !filters.amenities.every((amenity) => hotel.amenities.includes(amenity))) {
    return false
  }

  if (filters.mealPlan.length > 0) {
    const mealPlans = hotel.rooms.flatMap((room) => room.rates.map((rate) => rate.mealPlan))
    if (!filters.mealPlan.some((plan) => mealPlans.includes(plan))) {
      return false
    }
  }

  if (filters.refundable !== null) {
    const rates = hotel.rooms.flatMap((room) => room.rates)
    if (!rates.some((rate) => rate.refundable === filters.refundable)) {
      return false
    }
  }

  return true
}

export function useHotelFilters(matchedHotels: Hotel[]) {
  const [filters, setFilters] = useState<HotelFiltersState>(DEFAULT_HOTEL_FILTERS)
  const [sortOption, setSortOption] = useState<HotelSortOption>('recommended')

  const filteredHotels = useMemo(() => {
    return matchedHotels.filter((hotel) => hotelMatchesFilters(hotel, filters))
  }, [matchedHotels, filters])

  const results = useMemo(() => {
    const sorted = [...filteredHotels]

    switch (sortOption) {
      case 'price_asc':
        return sorted.sort((a, b) => getHotelStartingPrice(a) - getHotelStartingPrice(b))
      case 'price_desc':
        return sorted.sort((a, b) => getHotelStartingPrice(b) - getHotelStartingPrice(a))
      case 'rating_desc':
        return sorted.sort((a, b) => b.guestRating - a.guestRating)
      case 'star_desc':
        return sorted.sort((a, b) => b.starRating - a.starRating || b.guestRating - a.guestRating)
      case 'reviews_desc':
        return sorted.sort((a, b) => b.guestReviewCount - a.guestReviewCount)
      case 'recommended':
      default:
        return sorted
    }
  }, [filteredHotels, sortOption])

  const updateFilter = <K extends keyof HotelFiltersState>(key: K, value: HotelFiltersState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_HOTEL_FILTERS)
  }

  const hasActiveFilters =
    filters.starRating.length > 0 ||
    filters.guestRatingMin !== null ||
    filters.propertyType.length > 0 ||
    filters.amenities.length > 0 ||
    filters.mealPlan.length > 0 ||
    filters.refundable !== null ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < DEFAULT_HOTEL_PRICE_MAX

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    sortOption,
    setSortOption,
    results,
    totalResults: matchedHotels.length,
    filteredCount: results.length,
  }
}
