import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import { AppShell } from '@/components/layout'
import { SITE_NAME } from '@/constants'
import './globals.css'

// ============================================================
// Fonts loaded via next/font for zero-layout-shift.
//  - --font-jakarta  → main body text
//  - --font-montserrat → headings & non-body text
// ============================================================
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

// ============================================================
// Root Metadata — base SEO for the entire platform.
// Individual pages override title/description via generateMetadata.
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL('https://lemontrip.in/'),
  icons: {
    icon: '/lemonTripLogo.jpeg',
    apple: '/lemonTripLogo.jpeg',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lemontrip.in/',
    siteName: SITE_NAME,
    title: 'LemonTrip – Flights, Hotels, Tours & Visa',
    description:
      'Book flights, hotels, tours and travel packages with LemonTrip. Explore easy travel booking and visa services.',
    images: [{ url: '/lemonTripLogo.jpeg', alt: 'LemonTrip' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LemonTrip – Flights, Hotels, Tours & Visa',
    description:
      'Book flights, hotels, tours and travel packages with LemonTrip. Explore easy travel booking and visa services.',
    images: ['/lemonTripLogo.jpeg'],
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
    <html lang="en" className={`${jakarta.variable} ${montserrat.variable}`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
