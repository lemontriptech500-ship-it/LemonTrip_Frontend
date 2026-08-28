export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  imageFallbackColor: string;
}

export const trendingDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches and temples.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
  },
  {
    id: 'dest-2',
    name: 'Paris',
    country: 'France',
    description: 'City of light, love, and world-class cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
  },
  {
    id: 'dest-3',
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Modern architecture and luxury shopping.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
  },
  {
    id: 'dest-4',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Neon-lit streets and historic temples.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
  },
  {
    id: 'dest-5',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Crystal clear waters and overwater bungalows.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
  },
  {
    id: 'dest-6',
    name: 'Rome',
    country: 'Italy',
    description: 'Ancient ruins and incredible pasta.',
    imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=85',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
  },
];
