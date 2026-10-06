import type { Metadata } from 'next'
import { Manrope, Cormorant_Garamond } from 'next/font/google'
import { AppShell } from '@/components/layout'
import { SITE_NAME } from '@/constants'
import './globals.css'
import ClarityInit from '@/components/ClarityInit'

// ============================================================
// Fonts loaded via next/font for zero-layout-shift.
//  - --font-manrope   → body text, nav, buttons, labels, captions,
//                       card titles (modern, refined sans)
//  - --font-cormorant → elegant serif for h1 / section titles only
// ============================================================

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

// ============================================================
// Root Metadata — base SEO for the entire platform.
// Individual pages override title/description via generateMetadata.
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL('https://lemontrip.in/'),
  icons: {
    icon: [{ url: '/favicon.jpeg', type: 'image/jpeg', sizes: '512x512' }],
    apple: [{ url: '/favicon.jpeg', type: 'image/jpeg', sizes: '512x512' }],
  },
  title: {
    default: 'LemonTrip – Flights, Hotels, Tours & Visa',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Book flights, hotels, tours, buses and travel packages with LemonTrip. Explore easy travel booking and visa services.',
  keywords: [
    'travel booking',
    'flights',
    'hotels',
    'bus tickets',
    'train tickets',
    'visa services',
    'holiday packages',
    'LemonTrip',
  ],
  authors: [{ name: 'LemonTrip' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lemontrip.in/',
    siteName: SITE_NAME,
    title: 'LemonTrip – Flights, Hotels, Tours & Visa',
    description:
      'Book flights, hotels, tours and travel packages with LemonTrip. Explore easy travel booking and visa services.',
    images: [{ url: 'https://lemontrip.in/web_logo_news.png', alt: 'Official LemonTrip travel booking logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LemonTrip – Flights, Hotels, Tours & Visa',
    description:
      'Book flights, hotels, tours and travel packages with LemonTrip. Explore easy travel booking and visa services.',
    images: ['https://lemontrip.in/web_logo_news.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ============================================================
// Root Layout
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <ClarityInit />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
