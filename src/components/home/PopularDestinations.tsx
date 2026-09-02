'use client'

import React from 'react'
import { Container } from '@/components/ui'

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
    image: 'https://images.unsplash.com/photo-1528183421442-e18d2a8ae5a3?w=600&q=80',
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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-4 pb-3 pt-4 sm:pb-5 sm:pt-6 lg:pb-3 lg:pt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-[#111111] text-[20px] font-bold leading-tight">
              Popular Destinations
            </h2>
            <span className="block mt-1.5 h-[3px] w-[45px] rounded-full bg-[var(--color-primary)]" />
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
        >
          {destinations.map((dest) => (
            <div
              key={dest.name}
              data-card
              className="relative aspect-[17/10] w-full overflow-hidden rounded-[10px] group"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-white text-[15px] font-semibold leading-tight">
                  {dest.name}
                </p>
                <p className="text-white text-[11px] font-medium">
                  {dest.label}
                </p>
                <p className="text-white text-[14px] font-bold">
                  {dest.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
