export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  imageFallbackColor: string;
  imageUrl?: string;
  date: string;
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
  },
  {
    id: 'blog-2',
    category: 'Destinations',
    title: 'Hidden Gems in Europe You Need to Visit',
    excerpt: 'Skip the crowded tourist traps and explore these beautiful, lesser-known European destinations on your next trip.',
    imageFallbackColor: 'bg-[var(--color-secondary-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85',
    date: 'Nov 05, 2023',
  },
  {
    id: 'blog-3',
    category: 'Visa Guide',
    title: 'Navigating the Schengen Visa Process',
    excerpt: 'A comprehensive, step-by-step guide to applying for a Schengen visa for your upcoming European adventure.',
    imageFallbackColor: 'bg-[var(--color-accent-soft)]',
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&q=85',
    date: 'Jan 20, 2024',
  },
];
