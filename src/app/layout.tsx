import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { AppShell } from '@/components/layout'
import { SITE_NAME } from '@/constants'
import './globals.css'
import ClarityInit from '@/components/ClarityInit'

// ============================================================
// Fonts loaded via next/font for zero-layout-shift.
//  - --font-inter → body text, navigation, buttons and labels
//  - --font-cormorant → display and section headings
// ============================================================

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
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
    default: 'LemonTrip – Flights, Hotels, Holidays, Buses, Trains & Visa',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Book flights, hotels, holiday packages, buses, train tickets and visa services with LemonTrip.',
  keywords: [
    'travel booking',
    'LemonTrip flights',
    'LemonTrip hotels',
    'LemonTrip holidays',
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
    title: 'LemonTrip – Flights, Hotels, Holidays, Buses, Trains & Visa',
    description:
      'Book flights, hotels, holiday packages, buses, train tickets and visa services with LemonTrip.',
    images: [{ url: 'https://lemontrip.in/web_logo_news.png', alt: 'Official LemonTrip travel booking logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LemonTrip – Flights, Hotels, Holidays, Buses, Trains & Visa',
    description:
      'Book flights, hotels, holiday packages, buses, train tickets and visa services with LemonTrip.',
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
      className={`${inter.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <ClarityInit />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
