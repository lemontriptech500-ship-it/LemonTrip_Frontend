'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector('[data-card]') as HTMLDivElement | null
    if (!card) return
    const gap = 16
    const scrollAmount = card.offsetWidth + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 pt-8 pb-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-[#111111] text-[20px] font-bold leading-tight">
              Popular Destinations
            </h2>
            <span className="block mt-1.5 h-[3px] w-[45px] rounded-full bg-[#0B7A43]" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-[34px] h-[34px] rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[#6B7280] hover:border-[#0B7A43] hover:text-[#0B7A43] transition-colors"
              aria-label="Scroll destinations left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-[34px] h-[34px] rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[#6B7280] hover:border-[#0B7A43] hover:text-[#0B7A43] transition-colors"
              aria-label="Scroll destinations right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory"
        >
          {destinations.map((dest) => (
            <div
              key={dest.name}
              data-card
              className="snap-start flex-0-auto w-[170px] h-[100px] relative rounded-[10px] overflow-hidden cursor-pointer group"
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
