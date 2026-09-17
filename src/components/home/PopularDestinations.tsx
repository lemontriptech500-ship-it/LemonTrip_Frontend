'use client'

import React from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui'

/**
 * PopularDestinations
 * ------------------------------------------------------------
 * Restyled to match the reference index.html ".destinations"
 * section:
 *  - shared SectionHeading (title left / description right)
 *    instead of the small yellow underline-accent heading
 *  - taller cards (220px mobile / 260px desktop, vs. the old
 *    17:10 aspect ratio) so the destination name has more room
 *  - gradient overlay now starts at ~35% of the card height
 *    (matching the reference) instead of a shallow bottom fade,
 *    which reads as noticeably more premium
 */

const destinations = [
  {
    name: 'Dubai',
    label: 'Packages From',
    price: '₹24,999',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  },
  {
    name: 'Maldives',
    label: 'Packages From',
    price: '₹29,999',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
  },
  {
    name: 'Thailand',
    label: 'Packages From',
    price: '₹19,999',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
  },
  {
    name: 'Singapore',
    label: 'Packages From',
    price: '₹22,999',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
  },
  {
    name: 'Europe',
    label: 'Packages From',
    price: '₹49,999',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80',
  },
  {
    name: 'Kashmir',
    label: 'Packages From',
    price: '₹15,999',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
  },
]

export function PopularDestinations() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Popular Destinations"
          description="Handpicked places and experiences designed for unforgettable journeys."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="group relative h-[220px] w-full overflow-hidden rounded-2xl lg:h-[260px]"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* gradient starts at 35% down, matching the reference */}
              <div className="absolute inset-x-0 bottom-0 top-[35%] bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4">
                <p className="text-lg font-bold leading-tight text-white">{dest.name}</p>
                <p className="text-xs font-medium text-white/90">
                  {dest.label} {dest.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}