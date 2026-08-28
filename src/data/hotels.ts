import { Hotel, Room, RoomRate, MealPlan } from '@/types/hotels';

// ============================================================
// Mock Hotel Dataset
// ~8 hotels with varied properties, rooms, and rates.
// Designed for frontend development: enough variation for
// filtering, sorting, and detail views without bloat.
// ============================================================

// --- Rate generator helpers ---

function createRate(
  id: string,
  name: string,
  basePrice: number,
  mealPlan: MealPlan,
  refundable: boolean,
  benefits: string[] = []
): RoomRate {
  return {
    id,
    name,
    pricePerNight: basePrice,
    currency: 'INR',
    mealPlan,
    refundable,
    cancellationPolicy: refundable
      ? 'Free cancellation up to 24 hours before check-in.'
      : 'Non-refundable. No cancellation allowed.',
    benefits,
  };
}

function createStandardRates(roomId: string, basePrice: number): RoomRate[] {
  return [
    createRate(`${roomId}-ro`, 'Room Only', basePrice, 'room_only', false),
    createRate(`${roomId}-bb`, 'Bed & Breakfast', basePrice + 600, 'breakfast', true, ['Buffet breakfast included']),
    createRate(`${roomId}-hb`, 'Half Board', basePrice + 1400, 'half_board', true, ['Breakfast + Dinner included', 'Free cancellation']),
  ];
}

// --- Room generator helper ---

function createRoom(
  id: string,
  name: string,
  type: Room['type'],
  description: string,
  bedType: string,
  maxAdults: number,
  maxChildren: number,
  amenities: string[],
  basePrice: number,
  availableQuantity: number = 5,
): Room {
  return {
    id,
    name,
    type,
    description,
    maxOccupancy: { maxAdults, maxChildren, maxTotal: maxAdults + maxChildren },
    bedType,
    amenities,
    images: [],
    rates: createStandardRates(id, basePrice),
    availableQuantity,
  };
}

// ============================================================
// HOTEL DATA
// ============================================================

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'The Grand Imperial',
    location: {
      city: 'Delhi',
      area: 'Connaught Place',
      address: '12 Barakhamba Road, Connaught Place',
      landmark: 'Near Rajiv Chowk Metro',
    },
    starRating: 5,
    guestRating: 4.6,
    guestReviewCount: 2340,
    description: 'A landmark heritage property in the heart of New Delhi, blending colonial grandeur with contemporary luxury. Elegant rooms, award-winning dining, and a rooftop pool overlooking the city skyline.',
    propertyType: 'hotel',
    images: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', alt: 'Hotel exterior at dusk', category: 'exterior' },
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', alt: 'Luxury suite bedroom', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Rooftop pool', category: 'pool' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Fine dining restaurant', category: 'dining' },
    ],
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant', 'bar', 'parking', 'room_service', 'laundry', 'business_center', 'ac'],
    checkInTime: '14:00',
    checkOutTime: '12:00',
    currency: 'INR',
    startingPrice: 8500,
    rooms: [
      createRoom('h1-r1', 'Superior Room', 'standard', 'Well-appointed room with city views, marble bathroom, and premium bedding.', '1 King Bed', 2, 1, ['minibar', 'safe', 'work desk', 'rain shower'], 8500),
      createRoom('h1-r2', 'Deluxe Room', 'deluxe', 'Spacious room with panoramic views, walk-in closet, and a sitting area.', '1 King Bed or 2 Twin Beds', 2, 2, ['minibar', 'safe', 'work desk', 'bathtub', 'balcony'], 11200),
      createRoom('h1-r3', 'Grand Suite', 'suite', 'Expansive suite with separate living room, dining area, and butler service.', '1 King Bed', 3, 2, ['minibar', 'safe', 'living room', 'bathtub', 'balcony', 'butler service'], 22000, 2),
    ],
  },

  {
    id: 'h2',
    name: 'Seaside Breeze Resort',
    location: {
      city: 'Goa',
      area: 'Calangute',
      address: 'Beach Road, Calangute',
      landmark: 'Direct beach access',
    },
    starRating: 4,
    guestRating: 4.3,
    guestReviewCount: 1870,
    description: 'A vibrant beachfront resort with tropical gardens, multiple pools, and direct access to Calangute beach. Perfect for families and couples seeking a sun-soaked getaway.',
    propertyType: 'resort',
    images: [
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Resort pool with ocean view', category: 'pool' },
      { url: 'https://images.unsplash.com/photo-1590490360182-c33d955bc27d?w=800', alt: 'Beach facing room', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800', alt: 'Open-air dining', category: 'dining' },
    ],
    amenities: ['wifi', 'pool', 'gym', 'spa', 'restaurant', 'bar', 'parking', 'room_service', 'ac', 'breakfast'],
    checkInTime: '15:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 5200,
    rooms: [
      createRoom('h2-r1', 'Garden View Room', 'standard', 'Comfortable room overlooking the tropical gardens with modern amenities.', '1 Queen Bed', 2, 1, ['minibar', 'safe', 'garden view'], 5200),
      createRoom('h2-r2', 'Sea View Deluxe', 'deluxe', 'Bright room with a private balcony facing the Arabian Sea.', '1 King Bed', 2, 2, ['minibar', 'balcony', 'sea view', 'safe'], 7800),
      createRoom('h2-r3', 'Premium Pool Villa', 'premium', 'Private villa with a plunge pool, outdoor shower, and direct beach path.', '1 King Bed', 2, 1, ['private pool', 'outdoor shower', 'minibar', 'sun deck'], 14500, 3),
    ],
  },

  {
    id: 'h3',
    name: 'Mountain Trail Lodge',
    location: {
      city: 'Manali',
      area: 'Old Manali',
      address: 'Hadimba Road, Old Manali',
      landmark: 'Near Hadimba Temple',
    },
    starRating: 3,
    guestRating: 4.1,
    guestReviewCount: 920,
    description: 'A cozy mountain lodge surrounded by pine forests, offering stunning valley views, a crackling fireplace lounge, and easy access to hiking trails and adventure activities.',
    propertyType: 'boutique',
    images: [
      { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', alt: 'Lodge exterior in the mountains', category: 'exterior' },
      { url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', alt: 'Cozy room with mountain view', category: 'room' },
    ],
    amenities: ['wifi', 'restaurant', 'parking', 'room_service', 'laundry'],
    checkInTime: '13:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 2800,
    rooms: [
      createRoom('h3-r1', 'Valley View Room', 'standard', 'Simple, warm room with a window overlooking the Kullu valley.', '1 Double Bed', 2, 1, ['heater', 'hot water', 'valley view'], 2800),
      createRoom('h3-r2', 'Pine Deluxe Room', 'deluxe', 'Larger room with wooden interiors, a writing desk, and forest views.', '1 King Bed', 2, 2, ['heater', 'hot water', 'forest view', 'work desk', 'sitting area'], 4200),
      createRoom('h3-r3', 'Family Suite', 'family', 'Two-bedroom suite with a shared living room, ideal for families.', '1 King Bed + 2 Single Beds', 4, 2, ['heater', 'hot water', 'living room', '2 bathrooms'], 6800, 2),
    ],
  },

  {
    id: 'h4',
    name: 'Lakeside Heritage Haveli',
    location: {
      city: 'Udaipur',
      area: 'Lake Pichola',
      address: 'Gangaur Ghat Road',
      landmark: 'Overlooking Lake Pichola',
    },
    starRating: 4,
    guestRating: 4.7,
    guestReviewCount: 1450,
    description: 'A beautifully restored 18th-century haveli on the banks of Lake Pichola. Ornate Rajasthani architecture, a tranquil courtyard, and sunset views over the Aravalli hills create an unforgettable stay.',
    propertyType: 'boutique',
    images: [
      { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', alt: 'Haveli exterior at sunset', category: 'exterior' },
      { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Heritage room with traditional decor', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', alt: 'Courtyard pool', category: 'pool' },
    ],
    amenities: ['wifi', 'pool', 'restaurant', 'room_service', 'laundry', 'ac', 'spa'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 6500,
    rooms: [
      createRoom('h4-r1', 'Heritage Room', 'standard', 'Traditionally furnished room with hand-painted murals and antique furniture.', '1 Queen Bed', 2, 1, ['minibar', 'safe', 'heritage decor'], 6500),
      createRoom('h4-r2', 'Lake View Suite', 'suite', 'Spacious suite with floor-to-ceiling windows overlooking Lake Pichola and the City Palace.', '1 King Bed', 2, 2, ['minibar', 'lake view', 'sitting area', 'bathtub', 'safe'], 12800, 3),
    ],
  },

  {
    id: 'h5',
    name: 'Metro Business Inn',
    location: {
      city: 'Mumbai',
      area: 'Andheri East',
      address: 'MIDC Road, Andheri East',
      landmark: 'Near Mumbai Airport',
    },
    starRating: 3,
    guestRating: 3.8,
    guestReviewCount: 650,
    description: 'A practical, no-fuss business hotel just 10 minutes from the domestic terminal. Clean rooms, fast Wi-Fi, and a 24-hour coffee shop make it ideal for transit stays and business trips.',
    propertyType: 'hotel',
    images: [
      { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', alt: 'Modern hotel room', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', alt: 'Hotel lobby', category: 'exterior' },
    ],
    amenities: ['wifi', 'restaurant', 'parking', 'airport_shuttle', 'business_center', 'laundry', 'ac'],
    checkInTime: '12:00',
    checkOutTime: '12:00',
    currency: 'INR',
    startingPrice: 3200,
    rooms: [
      createRoom('h5-r1', 'Standard Room', 'standard', 'Functional room with a comfortable bed, work desk, and blackout curtains.', '1 Double Bed', 2, 0, ['work desk', 'safe', 'tea/coffee maker'], 3200),
      createRoom('h5-r2', 'Executive Room', 'deluxe', 'Upgraded room with a larger workspace, ergonomic chair, and airport runway views.', '1 King Bed', 2, 1, ['work desk', 'ergonomic chair', 'minibar', 'safe', 'runway view'], 4800),
    ],
  },

  {
    id: 'h6',
    name: 'Backpacker Central Hostel',
    location: {
      city: 'Jaipur',
      area: 'MI Road',
      address: '34 MI Road, Pink City',
      landmark: 'Walking distance to Hawa Mahal',
    },
    starRating: 2,
    guestRating: 4.0,
    guestReviewCount: 1120,
    description: 'A vibrant, social hostel in the heart of the Pink City. Rooftop terrace, community kitchen, and walking tours included. A top pick for solo travellers and backpackers on a budget.',
    propertyType: 'hostel',
    images: [
      { url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', alt: 'Hostel common area', category: 'amenity' },
      { url: 'https://images.unsplash.com/photo-1590490359854-dfba19688a51?w=800', alt: 'Bunk bed dormitory', category: 'room' },
    ],
    amenities: ['wifi', 'restaurant', 'laundry', 'ac'],
    checkInTime: '13:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 800,
    rooms: [
      createRoom('h6-r1', 'Mixed Dormitory (8 Bed)', 'standard', 'Shared dormitory with personal locker, reading light, and USB charging point.', 'Bunk Bed', 1, 0, ['personal locker', 'reading light', 'USB port'], 800, 8),
      createRoom('h6-r2', 'Private Room', 'standard', 'Compact private room with en-suite bathroom, ideal for couples.', '1 Double Bed', 2, 0, ['en-suite bathroom', 'fan', 'reading light'], 2200, 4),
    ],
  },

  {
    id: 'h7',
    name: 'Spice Coast Villa',
    location: {
      city: 'Kochi',
      area: 'Fort Kochi',
      address: 'Princess Street, Fort Kochi',
      landmark: 'Near Chinese Fishing Nets',
    },
    starRating: 4,
    guestRating: 4.5,
    guestReviewCount: 780,
    description: 'A restored Portuguese-era villa in the charming Fort Kochi neighbourhood. Lush courtyard, Ayurvedic spa, and a celebrated Keralan cuisine restaurant. Steps from the waterfront and art galleries.',
    propertyType: 'villa',
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', alt: 'Villa exterior with garden', category: 'exterior' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Colonial-style bedroom', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800', alt: 'Courtyard garden', category: 'amenity' },
    ],
    amenities: ['wifi', 'spa', 'restaurant', 'room_service', 'laundry', 'ac', 'breakfast', 'parking'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 5800,
    rooms: [
      createRoom('h7-r1', 'Heritage Room', 'standard', 'Airy room with four-poster bed, antique furniture, and courtyard access.', '1 Queen Bed', 2, 1, ['courtyard access', 'antique furniture', 'ceiling fan'], 5800),
      createRoom('h7-r2', 'Spice Suite', 'suite', 'Upper-floor suite with a private terrace, handloom furnishings, and harbour views.', '1 King Bed', 2, 2, ['private terrace', 'harbour view', 'minibar', 'bathtub'], 9500, 2),
    ],
  },

  {
    id: 'h8',
    name: 'Sky Tower Apartment Hotel',
    location: {
      city: 'Bengaluru',
      area: 'Koramangala',
      address: '5th Block, Koramangala',
      landmark: 'Near Forum Mall',
    },
    starRating: 4,
    guestRating: 4.2,
    guestReviewCount: 540,
    description: 'Modern serviced apartments in Bengaluru\'s tech hub. Full kitchenette, washer-dryer, and co-working space in the lobby. Ideal for extended stays, remote workers, and relocating professionals.',
    propertyType: 'apartment',
    images: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Modern apartment living room', category: 'room' },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Kitchen and dining area', category: 'room' },
    ],
    amenities: ['wifi', 'gym', 'parking', 'laundry', 'business_center', 'ac'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    currency: 'INR',
    startingPrice: 4500,
    rooms: [
      createRoom('h8-r1', 'Studio Apartment', 'standard', 'Open-plan studio with kitchenette, smart TV, and high-speed Wi-Fi.', '1 Queen Bed', 2, 0, ['kitchenette', 'washer-dryer', 'smart TV', 'work desk'], 4500),
      createRoom('h8-r2', '1BHK Apartment', 'deluxe', 'Separate bedroom and living room with full kitchen, ideal for longer stays.', '1 King Bed', 2, 2, ['full kitchen', 'washer-dryer', 'smart TV', 'work desk', 'living room', 'balcony'], 6800),
      createRoom('h8-r3', '2BHK Apartment', 'family', 'Two-bedroom apartment with living room, full kitchen, and city views.', '1 King Bed + 2 Single Beds', 4, 2, ['full kitchen', 'washer-dryer', 'smart TV', '2 bathrooms', 'living room', 'balcony'], 9200, 3),
    ],
  },
];

export function getHotelById(id: string): Hotel | undefined {
  return MOCK_HOTELS.find((hotel) => hotel.id === id);
}
