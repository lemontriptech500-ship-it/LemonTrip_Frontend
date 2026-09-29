import React from 'react'
import { Building2, ShieldCheck, Gift, ThumbsUp, Headphones } from 'lucide-react'

/**
 * TravelBenefits
 * ------------------------------------------------------------
 * Fix + restyle:
 *  - Replaced hardcoded hex colors (#EEEEEE border, #172019 title,
 *    #69736D description) with your actual design tokens
 *    (--color-border-light, --color-text-primary,
 *    --color-text-muted). Same visual result today, but now this
 *    section will actually follow your palette if those tokens
 *    ever change, instead of silently drifting out of sync.
 *  - Corners bumped to rounded-2xl (was rounded-lg) and the
 *    hardcoded rgba shadow swapped for --shadow-sm / --shadow-md,
 *    matching the shadow language used everywhere else on the
 *    homepage (FeaturedOffers, PopularPackages, WhyChooseUs).
 */

const benefits = [
  {
    title: 'Handpicked Hotels',
    description: 'Quality stays across the globe',
    icon: Building2,
  },
  {
    title: 'Best Price Guarantee',
    description: 'Get the best deals on every booking',
    icon: ShieldCheck,
  },
  {
    title: 'Exclusive Packages',
    description: 'Curated experiences just for you',
    icon: Gift,
  },
  {
    title: 'Easy Bookings',
    description: 'Book in minutes with ease',
    icon: ThumbsUp,
  },
  {
    title: '24/7 Support',
    description: 'We are here for you always',
    icon: Headphones,
  },
]

export function TravelBenefits() {
  return (
    <section className="w-full bg-white py-3 sm:py-4 lg:pb-4 lg:pt-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-[var(--color-border-light)] bg-white p-3 shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] sm:gap-4 sm:p-4 lg:p-2.5"
              >
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] sm:h-[44px] sm:w-[44px]">
                  <Icon size={18} className="text-[var(--green-dark)] sm:text-[22px]" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold leading-tight text-[var(--color-text-primary)] sm:text-[14px]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--color-text-muted)] sm:text-[12px]">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
