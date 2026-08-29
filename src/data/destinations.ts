export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  imageFallbackColor: string;
  popularFor?: string
}

export const trendingDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches, ancient temples, and vibrant culture.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    popularFor: 'Beaches & Culture',
  },
  {
    id: 'dest-2',
    name: 'Paris',
    country: 'France',
    description: 'City of light, love, and world-class cuisine. Home to the Eiffel Tower and Louvre.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    popularFor: 'Romance & Art',
  },
  {
    id: 'dest-3',
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Modern architecture, luxury shopping, and desert adventures in a futuristic city.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    popularFor: 'Luxury & Shopping',
  },
  {
    id: 'dest-4',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Neon-lit streets and historic temples. A perfect blend of tradition and technology.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    popularFor: 'Culture & Technology',
  },
  {
    id: 'dest-5',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Crystal clear waters and overwater bungalows. The ultimate tropical escape.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    popularFor: 'Honeymoon & Relaxation',
  },
  {
    id: 'dest-6',
    name: 'Rome',
    country: 'Italy',
    description: 'Ancient ruins, incredible pasta, and Renaissance art. A walk through history.',
    imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    popularFor: 'History & Food',
  },
  {
    id: 'dest-7',
    name: 'Switzerland',
    country: 'Switzerland',
    description: 'Majestic Alps, pristine lakes, and charming villages. A scenic wonderland.',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    popularFor: 'Mountains & Adventure',
  },
  {
    id: 'dest-8',
    name: 'Goa',
    country: 'India',
    description: 'Sun-kissed beaches, Portuguese heritage, and vibrant nightlife. India\'s party capital.',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    popularFor: 'Beaches & Nightlife',
  },
]
