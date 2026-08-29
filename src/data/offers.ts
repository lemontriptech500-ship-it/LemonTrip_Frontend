export interface Offer {
  id: string;
  category: string;
  title: string;
  description: string;
  code?: string;
  discount?: string;
  validTill?: string;
  imageColor: string;
  imageUrl?: string;
}

export const featuredOffers: Offer[] = [
  {
    id: 'offer-1',
    category: 'Flight Deals',
    title: 'Up to 20% off Domestic Flights',
    description: 'Book your next domestic trip with us and save big on top airlines. Valid on all major routes.',
    code: 'LEMONFLY20',
    discount: '20% OFF',
    validTill: '2026-09-30',
    imageColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
  },
  {
    id: 'offer-2',
    category: 'Hotel Discounts',
    title: 'Luxury Stays at Budget Prices',
    description: 'Enjoy 5-star amenities for less. Handpicked hotels for your comfort across India.',
    code: 'STAYLUX',
    discount: '30% OFF',
    validTill: '2026-10-15',
    imageColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=85',
  },
  {
    id: 'offer-3',
    category: 'Holiday Packages',
    title: 'Summer Getaway Special',
    description: 'All-inclusive packages to beach destinations. Limited time offer for families.',
    code: 'SUMMER25',
    discount: '₹5000 OFF',
    validTill: '2026-08-31',
    imageColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
  },
  {
    id: 'offer-4',
    category: 'Visa Assistance',
    title: 'Hassle-free Visa Processing',
    description: 'Get expert guidance for your international travel visas. Quick and reliable.',
    code: 'VISA10',
    discount: '10% OFF',
    validTill: '2026-12-31',
    imageColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=900&q=85',
  },
  {
    id: 'offer-5',
    category: 'Train Bookings',
    title: 'Zero Convenience Fee on Trains',
    description: 'Book IRCTC tickets with zero convenience fee. Fast and secure bookings.',
    code: 'TRAIN0',
    discount: 'FREE',
    validTill: '2026-09-15',
    imageColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=85',
  },
  {
    id: 'offer-6',
    category: 'Bus Travel',
    title: 'Flat ₹200 off on First Bus Booking',
    description: 'New user exclusive! Get flat ₹200 off on your first bus ticket booking.',
    code: 'BUS200',
    discount: '₹200 OFF',
    validTill: '2026-10-30',
    imageColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&q=85',
  },
  {
    id: 'offer-7',
    category: 'International Flights',
    title: 'Up to ₹10,000 off International',
    description: 'Save big on international flights to Europe, USA, and Southeast Asia.',
    code: 'INTL10K',
    discount: '₹10,000 OFF',
    validTill: '2026-11-30',
    imageColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
  },
  {
    id: 'offer-8',
    category: 'Group Bookings',
    title: 'Special Group Discounts',
    description: 'Book for 4 or more travelers and get exclusive group discounts on all services.',
    code: 'GROUP15',
    discount: '15% OFF',
    validTill: '2026-12-31',
    imageColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85',
  },
]
