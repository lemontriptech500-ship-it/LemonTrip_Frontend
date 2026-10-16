/** Shared route rules keep the navigation and page banners in sync. */
const discoveryPages = new Set(['/packages', '/offers', '/blog', '/visa', '/services', '/trip-planner'])
const searchPages = new Set(['/flights', '/hotels', '/trains', '/buses'])
const imagePages = new Set([...discoveryPages, ...searchPages, '/contact'])

export function getPageHeaderVariant(pathname: string) {
  if (discoveryPages.has(pathname)) return 'discovery'
  if (searchPages.has(pathname)) return 'search'
  return 'compact'
}

export function hasOverlayHeader(pathname: string) {
  return pathname === '/' || imagePages.has(pathname)
}

const sectionLabels: Record<string, string> = {
  flights: 'Flights', hotels: 'Hotels', trains: 'Trains', buses: 'Buses',
  packages: 'Holidays', offers: 'Offers', blog: 'Travel stories', visa: 'Visa',
  services: 'Services', contact: 'Contact', profile: 'My profile',
  wallet: 'My wallet', bookings: 'My bookings', cart: 'Your cart',
  wishlist: 'Wishlist', privacy: 'Privacy policy', terms: 'Terms of service',
  'trip-planner': 'AI Trip Planner',
}

export function getPageBreadcrumb(pathname: string) {
  const [section, detail] = pathname.split('/').filter(Boolean)
  return { label: sectionLabels[section] || 'LemonTrip', href: `/${section}`, nested: Boolean(detail) }
}
