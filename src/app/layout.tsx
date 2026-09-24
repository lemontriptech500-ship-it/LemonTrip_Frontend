import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Montserrat, Playfair_Display } from 'next/font/google'
import { AppShell } from '@/components/layout'
import { SITE_NAME } from '@/constants'
import './globals.css'
import ClarityInit from '@/components/ClarityInit';


// ============================================================
// Fonts loaded via next/font for zero-layout-shift.
//  - --font-jakarta    → main body text
//  - --font-montserrat → labels, captions, nav, buttons
//  - --font-playfair   → NEW: serif display font for h1 / section titles,
//                         this is what gives the "professional / editorial"
//                         look from the reference index.html
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
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
    <html
      lang="en"
      className={`${jakarta.variable} ${montserrat.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
      <ClarityInit />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}