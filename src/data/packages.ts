export interface HolidayPackage {
  id: string;
  destination: string;
  duration: string;
  description: string;
  startingPrice: string; // e.g., "From INR 59,900"
  highlights: string[];
  imageFallbackColor: string;
  imageUrl?: string;
  badge?: string; // e.g., "Best Seller" | "Popular" | "Luxury" — optional pill shown on the package card
}

export const popularPackages: HolidayPackage[] = [
  {
    id: 'pkg-1',
    destination: 'Swiss Alps Explorer',
    duration: '7 Days, 6 Nights',
    description: 'Experience the breathtaking beauty of the Swiss Alps with scenic train rides and cozy stays.',
    startingPrice: 'From INR 129,900 (Sample)',
    highlights: ['Scenic Train Rides', 'Mountain Tours', 'Breakfast Included'],
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=85',
    badge: 'Best Seller',
  },
  {
    id: 'pkg-2',
    destination: 'Tropical Maldives',
    duration: '5 Days, 4 Nights',
    description: 'Relax in overwater villas and enjoy the crystal-clear waters of the Indian Ocean.',
    startingPrice: 'From INR 89,900 (Sample)',
    highlights: ['Overwater Villa', 'Snorkeling', 'All-Inclusive'],
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=85',
    badge: 'Popular',
  },
  {
    id: 'pkg-3',
    destination: 'Cultural Japan',
    duration: '10 Days, 9 Nights',
    description: 'Discover the perfect blend of ancient traditions and modern technology in Japan.',
    startingPrice: 'From INR 189,900 (Sample)',
    highlights: ['Tokyo City Tour', 'Kyoto Temples', 'Bullet Train Pass'],
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85',
    badge: 'Luxury',
  },
];