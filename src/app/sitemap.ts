import type { MetadataRoute } from 'next'

const siteUrl = 'https://lemontrip.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    '/',
    '/flights',
    '/hotels',
    '/buses',
    '/trains',
    '/packages',
    '/visa',
    '/services',
    '/offers',
    '/blog',
    '/contact',
  ]
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
