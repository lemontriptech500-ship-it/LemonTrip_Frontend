export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  imageFallbackColor: string;
  imageUrl?: string;
  date: string;
  readTime?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'Travel Tips',
    title: '10 Essential Items to Pack for a Beach Vacation',
    excerpt: 'Don\'t let a forgotten item ruin your sunny getaway. Here is our ultimate packing list for the perfect beach trip.',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
  },
  {
    id: 'blog-2',
    category: 'Destinations',
    title: 'Hidden Gems in Europe You Need to Visit',
    excerpt: 'Skip the crowded tourist traps and explore these beautiful, lesser-known European destinations on your next trip.',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85',
    date: 'Nov 05, 2023',
    readTime: '8 min read',
  },
  {
    id: 'blog-3',
    category: 'Visa Guide',
    title: 'Navigating the Schengen Visa Process',
    excerpt: 'A comprehensive, step-by-step guide to applying for a Schengen visa for your upcoming European adventure.',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&q=85',
    date: 'Jan 20, 2024',
    readTime: '10 min read',
  },
  {
    id: 'blog-4',
    category: 'Budget Travel',
    title: 'How to Travel India on ₹500 a Day',
    excerpt: 'Smart budgeting tips for exploring India without breaking the bank. From street food to budget stays.',
    imageFallbackColor: 'bg-[var(--color-primary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=85',
    date: 'Feb 14, 2024',
    readTime: '7 min read',
  },
  {
    id: 'blog-5',
    category: 'Travel Tips',
    title: 'Business Travel: Packing Light for Short Trips',
    excerpt: 'Master the art of minimalist packing for business trips. Look sharp with just a carry-on bag.',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85',
    date: 'Mar 08, 2024',
    readTime: '4 min read',
  },
  {
    id: 'blog-6',
    category: 'Destinations',
    title: 'Best Hill Stations to Visit in India This Summer',
    excerpt: 'Escape the heat with these stunning hill stations across India. From Shimla to Munnar, plan your perfect getaway.',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
    date: 'Apr 22, 2024',
    readTime: '6 min read',
  },
]
