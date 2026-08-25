// ── Static Package Data ────────────────────────────────────────────────
// Categories each package belongs to (supports multi-category)
export const CATEGORIES = [
  'All Journeys',
  'Beach Escapes',
  'Honeymoon',
  'Adventure',
  'Family',
  'International',
];

export const packages = [
  {
    id: 1,
    slug: 'maldives-escape',
    title: 'Maldives Escape',
    location: 'Maldives',
    region: 'Indian Ocean',
    description: 'Private villas, turquoise waters, and unforgettable sunsets.',
    duration: '5 Days / 4 Nights',
    price: 89999,
    badge: 'Most Loved',
    categories: ['Honeymoon', 'Beach Escapes'],
    image:
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=85&fit=crop&crop=center',
  },
  {
    id: 2,
    slug: 'bali-discovery',
    title: 'Bali Discovery',
    location: 'Bali, Indonesia',
    region: 'Southeast Asia',
    description: 'Temples, tropical beaches, and adventures around every corner.',
    duration: '6 Days / 5 Nights',
    price: 64999,
    badge: 'Trending',
    categories: ['International', 'Beach Escapes'],
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85&fit=crop&crop=center',
  },
  {
    id: 3,
    slug: 'kashmir-paradise',
    title: 'Kashmir Paradise',
    location: 'Kashmir, India',
    region: 'North India',
    description: 'Snow-covered peaks, peaceful lakes, and breathtaking valleys.',
    duration: '7 Days / 6 Nights',
    price: 34999,
    badge: null,
    categories: ['Adventure', 'Family'],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&fit=crop&crop=center',
  },
  {
    id: 4,
    slug: 'dubai-luxury',
    title: 'Dubai Luxury Escape',
    location: 'Dubai, UAE',
    region: 'Middle East',
    description: 'Sky-high experiences, desert adventures, and world-class luxury.',
    duration: '5 Days / 4 Nights',
    price: 54999,
    badge: null,
    categories: ['International'],
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85&fit=crop&crop=center',
  },
  {
    id: 5,
    slug: 'thailand-island',
    title: 'Thailand Island Adventure',
    location: 'Phuket & Krabi',
    region: 'Southeast Asia',
    description: 'Island hopping, vibrant nightlife, and tropical adventures.',
    duration: '6 Days / 5 Nights',
    price: 49999,
    badge: null,
    categories: ['Beach Escapes', 'Adventure', 'International'],
    image:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85&fit=crop&crop=center',
  },
  {
    id: 6,
    slug: 'europe-explorer',
    title: 'Europe Explorer',
    location: 'Multiple European Cities',
    region: 'Europe',
    description: 'Iconic cities, timeless culture, and unforgettable European experiences.',
    duration: '10 Days / 9 Nights',
    price: 129999,
    badge: 'Premium',
    categories: ['International', 'Family'],
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=85&fit=crop&crop=center',
  },
];
