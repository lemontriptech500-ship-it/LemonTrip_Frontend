import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/signup', '/forgot-password', '/profile', '/bookings', '/cart', '/checkout', '/payment-success', '/wallet', '/wishlist', '/design-system'],
    },
    sitemap: 'https://lemontrip.in/sitemap.xml',
  }
}
