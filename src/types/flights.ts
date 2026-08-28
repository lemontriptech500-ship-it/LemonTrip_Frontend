// src/types/flights.ts

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  
  origin: string;
  destination: string;
  
  departureTime: string; // ISO string
  arrivalTime: string;   // ISO string
  durationMinutes: number;
  
  stops: number;
  stopLocations?: string[];
  
  price: number;
  currency: string;
  
  travelClass: 'economy' | 'business' | 'first' | 'sleeper';
  refundable: boolean;
  baggageAllowance: string;
  
  segments?: FlightSegment[];
  fareOptions?: FareOption[];
}

export interface FlightSegment {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  flightNumber: string;
  airline: string;
  airlineCode: string;
}

export interface FareOption {
  id: string;
  name: string; // e.g. "Saver", "Flex", "Premium"
  price: number;
  currency: string;
  cabinClass: string;
  refundable: boolean;
  baggageAllowance: string;
  cancellationPolicy: string;
  changePolicy: string;
  benefits: string[];
}

export type SortOption = 
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'duration_asc'
  | 'departure_asc'
  | 'departure_desc';

export interface FlightFiltersState {
  stops: number[]; // e.g. [0, 1]
  airlines: string[]; // e.g. ["IndiGo", "Air India"]
  departureTime: string[]; // e.g. ["morning", "afternoon"]
  priceRange: [number, number]; // [min, max]
  refundable: boolean | null;
}
