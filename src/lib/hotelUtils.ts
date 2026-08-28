import type {
  Hotel,
  HotelPriceBreakdown,
  HotelSearchParams,
  HotelBookingData,
  Room,
  RoomRate,
  RoomSelection,
} from '@/types/hotels'
import { parseHotelSearchParams } from '@/lib/searchParams'

export const HOTEL_BOOKING_STORAGE_PREFIX = 'hotelBooking_'

export const HOTEL_SEARCH_LIMITS = {
  minRooms: 1,
  maxRooms: 8,
  minAdults: 1,
  maxAdults: 16,
  minChildren: 0,
  maxChildren: 8,
} as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function parseCount(raw: string, fallback: number): number {
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

function isValidStayDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    !Number.isNaN(date.getTime()) &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

/** Calendar nights between YYYY-MM-DD stay dates. Returns 0 if invalid. */
export function getNightCount(checkIn: string, checkOut: string): number {
  if (!isValidStayDate(checkIn) || !isValidStayDate(checkOut)) return 0
  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0
  const diff = end.getTime() - start.getTime()
  if (diff <= 0) return 0
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export function isCheckOutAfterCheckIn(checkIn: string, checkOut: string): boolean {
  return getNightCount(checkIn, checkOut) >= 1
}

export function normalizeHotelSearchParams(
  raw: ReturnType<typeof parseHotelSearchParams>
): HotelSearchParams {
  return {
    destination: raw.destination.trim(),
    checkIn: raw.checkIn,
    checkOut: raw.checkOut,
    rooms: clamp(parseCount(raw.rooms, 1), HOTEL_SEARCH_LIMITS.minRooms, HOTEL_SEARCH_LIMITS.maxRooms),
    adults: clamp(parseCount(raw.adults, 2), HOTEL_SEARCH_LIMITS.minAdults, HOTEL_SEARCH_LIMITS.maxAdults),
    children: clamp(parseCount(raw.children, 0), HOTEL_SEARCH_LIMITS.minChildren, HOTEL_SEARCH_LIMITS.maxChildren),
  }
}

export function getHotelSearchFromUrl(searchParams: URLSearchParams): HotelSearchParams {
  return normalizeHotelSearchParams(parseHotelSearchParams(searchParams))
}

export function isHotelSearchComplete(params: HotelSearchParams): boolean {
  return validateHotelSearch(params) === null
}

/** Formats a YYYY-MM-DD stay date for display. Returns empty string if invalid. */
export function formatStayDate(isoDate: string): string {
  if (!isValidStayDate(isoDate)) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function matchHotelsByDestination(hotels: readonly Hotel[], destination: string): Hotel[] {
  return hotels.filter((hotel) => hotelMatchesDestination(hotel, destination))
}

export function validateHotelSearch(params: HotelSearchParams): string | null {
  if (!params.destination) return 'Please enter a destination.'
  if (!params.checkIn || !params.checkOut) return 'Please choose check-in and check-out dates.'
  if (!isCheckOutAfterCheckIn(params.checkIn, params.checkOut)) {
    return 'Check-out must be after check-in.'
  }
  if (params.rooms < HOTEL_SEARCH_LIMITS.minRooms || params.rooms > HOTEL_SEARCH_LIMITS.maxRooms) {
    return 'Please choose a valid number of rooms.'
  }
  if (params.adults < HOTEL_SEARCH_LIMITS.minAdults) {
    return 'At least one adult is required.'
  }
  if (params.children < HOTEL_SEARCH_LIMITS.minChildren) {
    return 'Children cannot be negative.'
  }
  return null
}

export function serializeHotelSearchParams(params: HotelSearchParams): URLSearchParams {
  const query = new URLSearchParams()
  query.set('destination', params.destination)
  query.set('checkIn', params.checkIn)
  query.set('checkOut', params.checkOut)
  query.set('rooms', String(params.rooms))
  query.set('adults', String(params.adults))
  query.set('children', String(params.children))
  return query
}

export function buildHotelSearchUrl(params: HotelSearchParams): string {
  return `/hotels?${serializeHotelSearchParams(params).toString()}`
}

export function hotelBookingStorageKey(hotelId: string): string {
  return `${HOTEL_BOOKING_STORAGE_PREFIX}${hotelId}`
}

/**
 * Accommodation total only: rate × nights × rooms.
 * Does not add taxes, fees, or discounts.
 */
export function calculateAccommodationTotal(
  pricePerNight: number,
  nights: number,
  rooms: number,
  currency = 'INR'
): HotelPriceBreakdown {
  const safeNights = Math.max(0, nights)
  const safeRooms = Math.max(0, rooms)
  const safeRate = Math.max(0, pricePerNight)
  return {
    nights: safeNights,
    rooms: safeRooms,
    pricePerNight: safeRate,
    accommodationTotal: safeRate * safeNights * safeRooms,
    currency,
  }
}

export function calculateSelectionsTotal(
  items: Array<{ pricePerNight: number; quantity: number }>,
  nights: number,
  currency = 'INR'
): { nights: number; accommodationTotal: number; currency: string } {
  const safeNights = Math.max(0, nights)
  const accommodationTotal = items.reduce((sum, item) => {
    return sum + Math.max(0, item.pricePerNight) * Math.max(0, item.quantity) * safeNights
  }, 0)
  return { nights: safeNights, accommodationTotal, currency }
}

export function getHotelStartingPrice(hotel: Hotel): number {
  const prices = hotel.rooms.flatMap((room) => room.rates.map((rate) => rate.pricePerNight))
  if (prices.length === 0) return hotel.startingPrice
  return Math.min(...prices)
}

export function findRoom(hotel: Hotel, roomId: string): Room | undefined {
  return hotel.rooms.find((room) => room.id === roomId)
}

export function findRate(room: Room, rateId: string): RoomRate | undefined {
  return room.rates.find((rate) => rate.id === rateId)
}

export function resolveSelection(
  hotel: Hotel,
  selection: RoomSelection
): { room: Room; rate: RoomRate } | null {
  const room = findRoom(hotel, selection.roomId)
  if (!room) return null
  const rate = findRate(room, selection.rateId)
  if (!rate) return null
  return { room, rate }
}

export type HotelBookingRecovery = 'results' | 'rooms' | 'guests'

export interface HotelBookingValidationIssue {
  message: string
  recovery: HotelBookingRecovery
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** Parses Hotel sessionStorage JSON. Returns null for missing, invalid, or non-object payloads. */
export function parseHotelBookingFromStorage(raw: string | null): HotelBookingData | null {
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed) || typeof parsed.hotelId !== 'string') return null
    if (typeof parsed.checkIn !== 'string' || typeof parsed.checkOut !== 'string') return null
    if (!Array.isArray(parsed.selections)) return null
    return parsed as unknown as HotelBookingData
  } catch {
    return null
  }
}

/**
 * Validates a persisted Hotel booking against the typed catalog.
 * Safe to reuse on Payment and Confirmation. Does not trust sessionStorage.
 */
export function validateHotelBooking(
  hotel: Hotel | undefined,
  booking: HotelBookingData | null
): HotelBookingValidationIssue | null {
  if (!hotel) {
    return { message: 'We could not find this hotel.', recovery: 'results' }
  }

  if (!booking) {
    return {
      message: 'Your hotel booking details are missing or could not be read. Select rooms to continue.',
      recovery: 'rooms',
    }
  }

  return validateHotelBookingData(hotel, booking)
}

export function validateHotelBookingData(hotel: Hotel, booking: HotelBookingData): HotelBookingValidationIssue | null {
  if (booking.hotelId !== hotel.id) {
    return { message: 'This booking does not match the selected hotel.', recovery: 'rooms' }
  }

  if (!isCheckOutAfterCheckIn(booking.checkIn, booking.checkOut)) {
    return { message: 'Your stay dates are invalid. Check-out must be after check-in.', recovery: 'rooms' }
  }

  const nights = getNightCount(booking.checkIn, booking.checkOut)
  if (booking.nightCount !== nights) {
    return { message: 'Your stay duration no longer matches the selected dates.', recovery: 'rooms' }
  }

  if (
    !Number.isInteger(booking.roomsRequested) ||
    booking.roomsRequested < HOTEL_SEARCH_LIMITS.minRooms ||
    booking.roomsRequested > HOTEL_SEARCH_LIMITS.maxRooms ||
    !Number.isInteger(booking.adults) ||
    booking.adults < HOTEL_SEARCH_LIMITS.minAdults ||
    booking.adults > HOTEL_SEARCH_LIMITS.maxAdults ||
    !Number.isInteger(booking.children) ||
    booking.children < HOTEL_SEARCH_LIMITS.minChildren ||
    booking.children > HOTEL_SEARCH_LIMITS.maxChildren
  ) {
    return { message: 'Your requested occupancy is invalid.', recovery: 'rooms' }
  }

  if (!Array.isArray(booking.selections) || booking.selections.length === 0) {
    return { message: 'Select rooms before continuing.', recovery: 'rooms' }
  }

  const selectedRoomCount = booking.selections.reduce((sum, selection) => {
    return sum + (Number.isInteger(selection.quantity) ? selection.quantity : 0)
  }, 0)

  if (selectedRoomCount !== booking.roomsRequested) {
    return { message: 'Selected rooms no longer match your requested room count.', recovery: 'rooms' }
  }

  let adultCapacity = 0
  let childCapacity = 0
  let totalCapacity = 0

  for (const selection of booking.selections) {
    const resolved = resolveSelection(hotel, selection)
    if (
      !resolved ||
      !Number.isInteger(selection.quantity) ||
      selection.quantity < 1 ||
      selection.quantity > resolved.room.availableQuantity
    ) {
      return { message: 'A selected room or rate is no longer available.', recovery: 'rooms' }
    }

    adultCapacity += resolved.room.maxOccupancy.maxAdults * selection.quantity
    childCapacity += resolved.room.maxOccupancy.maxChildren * selection.quantity
    totalCapacity += resolved.room.maxOccupancy.maxTotal * selection.quantity
  }

  if (
    adultCapacity < booking.adults ||
    childCapacity < booking.children ||
    totalCapacity < booking.adults + booking.children
  ) {
    return { message: 'Selected rooms do not accommodate all guests.', recovery: 'rooms' }
  }

  const primaryGuest = booking.guests?.[0]
  if (!primaryGuest?.firstName?.trim() || !primaryGuest.lastName?.trim()) {
    return { message: 'Add the primary guest details before continuing.', recovery: 'guests' }
  }

  const email = booking.contact?.email?.trim() ?? ''
  const phoneCode = booking.contact?.phoneCode?.trim() ?? ''
  const phoneNumber = (booking.contact?.phoneNumber ?? '').replace(/[\s-]/g, '')

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phoneCode || !/^\d{5,15}$/.test(phoneNumber)) {
    return { message: 'Add valid contact details before continuing.', recovery: 'guests' }
  }

  return null
}

export function hotelMatchesDestination(hotel: Hotel, destination: string): boolean {
  const query = destination.trim().toLowerCase()
  if (!query) return true
  const haystack = [
    hotel.name,
    hotel.location.city,
    hotel.location.area,
    hotel.location.address,
    hotel.location.landmark ?? '',
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}
