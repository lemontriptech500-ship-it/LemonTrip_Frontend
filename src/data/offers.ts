export interface Offer {
  id: string;
  category: string;
  title: string;
  description: string;
  code?: string;
  imageColor: string; // Placeholder for image styling
  imageUrl?: string;
}

export const featuredOffers: Offer[] = [
  {
    id: 'offer-1',
    category: 'Flight Deals',
    title: 'Up to 20% off Domestic Flights',
    description: 'Book your next domestic trip with us and save big on top airlines.',
    code: 'LEMONFLY20',
    imageColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
  },
  {
    id: 'offer-2',
    category: 'Hotel Discounts',
    title: 'Luxury Stays at Budget Prices',
    description: 'Enjoy 5-star amenities for less. Handpicked hotels for your comfort.',
    code: 'STAYLUX',
    imageColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=85',
  },
  {
    id: 'offer-3',
    category: 'Holiday Packages',
    title: 'Summer Getaway Special',
    description: 'All-inclusive packages to beach destinations. Limited time offer.',
    imageColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
  },
  {
    id: 'offer-4',
    category: 'Visa Assistance',
    title: 'Hassle-free Visa Processing',
    description: 'Get expert guidance for your international travel visas.',
    imageColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=900&q=85',
  },
];
