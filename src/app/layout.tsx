import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import { AppShell } from '@/components/layout'
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/constants'
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
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/lemonTripLogo.jpeg',
    apple: '/lemonTripLogo.jpeg',
  },
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Book flights, hotels, buses, trains, holiday packages and visa services on LemonTrip — your all-in-one smart travel companion.',
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Book flights, hotels, buses, trains, holiday packages and visa services on LemonTrip.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Book flights, hotels, buses, trains, holiday packages and visa services on LemonTrip.',
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
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
