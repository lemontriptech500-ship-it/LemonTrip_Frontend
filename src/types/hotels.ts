import type { ContactInformation } from '@/types/booking';
// src/types/hotels.ts
// ============================================================
// LEMONTRIP — Hotel Domain Types
//
// Catalog: Hotel (property) → Room (inventory) → RoomRate (price option)
// Search:  HotelSearchParams (URL / deep-link)
// Booking: RoomSelection[] + occupancy + optional guests/contact
//
// Do not merge hotel-level and room-level fields.
// Do not reuse Flight / Fare / Traveller types here.
// ============================================================

// --- Property Classification ---

export type PropertyType = 'hotel' | 'resort' | 'boutique' | 'hostel' | 'villa' | 'apartment';

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  hotel: 'Hotel',
  resort: 'Resort',
  boutique: 'Boutique',
  hostel: 'Hostel',
  villa: 'Villa',
  apartment: 'Apartment',
};

// --- Amenities ---

export type HotelAmenity =
  | 'wifi'
  | 'pool'
  | 'gym'
  | 'spa'
  | 'restaurant'
  | 'bar'
  | 'parking'
  | 'airport_shuttle'
  | 'room_service'
  | 'laundry'
  | 'business_center'
  | 'pet_friendly'
  | 'ac'
  | 'breakfast';

export const AMENITY_LABELS: Record<HotelAmenity, string> = {
  wifi: 'Free Wi-Fi',
  pool: 'Swimming Pool',
  gym: 'Fitness Center',
  spa: 'Spa & Wellness',
  restaurant: 'Restaurant',
  bar: 'Bar / Lounge',
  parking: 'Free Parking',
  airport_shuttle: 'Airport Shuttle',
  room_service: 'Room Service',
  laundry: 'Laundry Service',
  business_center: 'Business Center',
  pet_friendly: 'Pet Friendly',
  ac: 'Air Conditioning',
  breakfast: 'Complimentary Breakfast',
};

// --- Meal Plans ---

export type MealPlan = 'room_only' | 'breakfast' | 'half_board' | 'full_board';

export const MEAL_PLAN_LABELS: Record<MealPlan, string> = {
  room_only: 'Room Only',
  breakfast: 'Bed & Breakfast',
  half_board: 'Half Board',
  full_board: 'Full Board',
};

// --- Location ---

export interface HotelLocation {
  city: string;
  area: string;
  address: string;
  landmark?: string;
}

// --- Images ---

export interface HotelImage {
  url: string;
  alt: string;
  category?: 'exterior' | 'room' | 'amenity' | 'dining' | 'pool';
}

// --- Room Occupancy ---

export interface RoomOccupancy {
  maxAdults: number;
  maxChildren: number;
  maxTotal: number;
}

// --- Room Rate ---

export interface RoomRate {
  id: string;
  rateKey?: string;
  rateType?: string;
  totalPrice?: number;
  name: string;                    // e.g. "Room Only", "With Breakfast"
  pricePerNight: number;
  currency: string;
  mealPlan: MealPlan;
  refundable: boolean;
  cancellationPolicy: string;
  benefits: string[];
}

// --- Room Type Classification ---

export type RoomType = 'standard' | 'deluxe' | 'suite' | 'premium' | 'family';

// --- Room ---

export interface Room {
  id: string;
  name: string;                    // e.g. "Deluxe King Room"
  type: RoomType;
  description: string;
  maxOccupancy: RoomOccupancy;
  bedType: string;                 // e.g. "1 King Bed", "2 Twin Beds"
  amenities: string[];             // room-specific: "balcony", "minibar", etc.
  images: HotelImage[];
  rates: RoomRate[];
  availableQuantity: number;
}

// --- Hotel (Top-Level Entity) ---

export interface Hotel {
  id: string;
  name: string;
  location: HotelLocation;
  starRating: number;              // 1–5
  guestRating: number;             // e.g. 4.2 out of 5
  guestReviewCount: number;
  description: string;
  propertyType: PropertyType;
  images: HotelImage[];
  amenities: HotelAmenity[];
  checkInTime: string;             // e.g. "14:00"
  checkOutTime: string;            // e.g. "12:00"
  rooms: Room[];
  currency: string;
  startingPrice: number;           // lowest room rate per night — used on search result cards
  supplier?: string;
}

// --- Search (URL / deep-link). Filters stay client-side. ---

export interface HotelSearchParams {
  destination: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  rooms: number;
  adults: number;
  children: number;
}

// --- Room Selection (booking state, supports multiple rooms) ---

export interface RoomSelection {
  roomId: string;
  rateId: string;
  quantity: number;
}

// --- Hotel Guest (distinct from flight Traveller) ---

export interface HotelGuest {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
}

// --- Stay pricing (no invented taxes/fees/discounts) ---

export interface HotelPriceBreakdown {
  nights: number;
  rooms: number;
  pricePerNight: number;
  accommodationTotal: number;
  currency: string;
}

// --- Hotel Booking Data (sessionStorage, keyed separately from flights) ---

export interface HotelBookingData {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  nightCount: number;
  roomsRequested: number;
  adults: number;
  children: number;
  selections: RoomSelection[];
  guests?: HotelGuest[];
  contact?: ContactInformation;
  confirmationReference?: string;
}

// --- Hotel Filters (client-side filter state) ---

export interface HotelFiltersState {
  priceRange: [number, number];
  starRating: number[];
  guestRatingMin: number | null;
  propertyType: PropertyType[];
  amenities: HotelAmenity[];
  mealPlan: MealPlan[];
  refundable: boolean | null;
}

// --- Hotel Sort ---

export type HotelSortOption =
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'star_desc'
  | 'reviews_desc';
