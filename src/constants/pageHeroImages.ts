/** Shared hero artwork for page banners and the site header. */
export const PAGE_HERO_IMAGES = {
  flight: '/Airliner Ascending Over Mosque Cityscape.png?hero-v=20260908',
  hotel: '/Modern Plaza with Mosque and Pavilion.png',
  bus: '/Modern Coach Bus by a Grand Mosque.png',
  train: '/Daylight High-Speed Train and Mosque Skyline.png',
  package: '/Luxury Waterfront Escape with Mosque Views.png',
  visa: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1800&q=85',
  offer: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85',
  travel: '/Traveler Overlooking a Mosque Waterfront.png',
} as const

export function getPageHeroImage(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/flights')) return PAGE_HERO_IMAGES.flight
  if (pathname.startsWith('/hotels')) return PAGE_HERO_IMAGES.hotel
  if (pathname.startsWith('/buses')) return PAGE_HERO_IMAGES.bus
  if (pathname.startsWith('/trains')) return PAGE_HERO_IMAGES.train
  if (pathname.startsWith('/packages')) return PAGE_HERO_IMAGES.package
  if (pathname.startsWith('/visa')) return PAGE_HERO_IMAGES.visa
  if (pathname.startsWith('/offers')) return PAGE_HERO_IMAGES.offer
  return PAGE_HERO_IMAGES.travel
}
