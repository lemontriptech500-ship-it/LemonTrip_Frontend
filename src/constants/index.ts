// ============================================================
// LEMONTRIP — Application Constants
// ============================================================

export const SITE_NAME = 'LemonTrip'
export const SITE_TAGLINE = 'Travel smarter. Travel better.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// --- Layout ---
export const MAX_CONTENT_WIDTH = '1280px'

// --- Navigation items (top-level) ---
// Icons are intentionally not imported here to keep this file
// framework-agnostic. Header component maps these with icon imports.
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Flights', href: '/flights' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Buses', href: '/buses' },
  { label: 'Trains', href: '/trains' },
  { label: 'Tours & Packages', href: '/packages' },
  { label: 'Services', href: '/services' },
  { label: 'Visa Services', href: '/visa' },
  { label: 'Offers', href: '/offers' },
  { label: 'Blog', href: '/blog' },
] as const

// --- Footer navigation groups ---
export const FOOTER_NAV = [
  {
    heading: 'Travel',
    links: [
      { label: 'Flights', href: '/flights' },
      { label: 'Hotels', href: '/hotels' },
      { label: 'Buses', href: '/buses' },
      { label: 'Trains', href: '/trains' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Visa Services', href: '/visa' },
      { label: 'Offers', href: '/offers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Sign Up', href: '/signup' },
      { label: 'My Profile', href: '/profile' },
      { label: 'Cart', href: '/cart' },
    ],
  },
] as const

// --- Travel module route map (used for breadcrumbs, page titles, etc.) ---
export const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/flights': 'Flights',
  '/hotels': 'Hotels',
  '/buses': 'Buses',
  '/trains': 'Trains',
  '/packages': 'Holiday Packages',
  '/visa': 'Visa Services',
  '/cart': 'Cart',
  '/checkout': 'Checkout',
  '/offers': 'Offers',
  '/blog': 'Blog & Travel Guides',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/profile': 'My Profile',
}
