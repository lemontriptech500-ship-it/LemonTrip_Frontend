'use client'

import React, { useState } from 'react'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { FlightSearchForm } from './FlightSearchForm'
import { HotelSearchForm } from './HotelSearchForm'
import { BusSearchForm } from './BusSearchForm'
import { TrainSearchForm } from './TrainSearchForm'
import { PackageSearchForm } from './PackageSearchForm'
import { VisaSearchForm } from './VisaSearchForm'
import { cn } from '@/lib/utils'

/**
 * TravelSearchWidget v3 — one card, two zones.
 * Dark-green tab header (yellow active tab, connects visually to the
 * hero gradient) on top of a white form body.
 */

const tabItems = [
  { id: 'flights', label: 'Flights', icon: Plane, content: <FlightSearchForm /> },
  { id: 'hotels', label: 'Hotels', icon: Bed, content: <HotelSearchForm /> },
  { id: 'bus', label: 'Buses', icon: BusFront, content: <BusSearchForm /> },
  { id: 'trains', label: 'Trains', icon: TrainFront, content: <TrainSearchForm /> },
  { id: 'packages', label: 'Packages', icon: Briefcase, content: <PackageSearchForm /> },
  { id: 'visa', label: 'Visa', icon: FileText, content: <VisaSearchForm /> },
]

export function TravelSearchWidget() {
  const [activeTab, setActiveTab] = useState('flights')
  const activeItem = tabItems.find((item) => item.id === activeTab)

  return (
    <div className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-15px_rgba(4,45,27,0.55)] ring-1 ring-black/5">
      <div
        role="tablist"
        aria-label="Search category"
        className="hide-scrollbar flex gap-1 overflow-x-auto bg-[var(--green-dark)] px-3 pt-3 sm:px-5"
      >
        {tabItems.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors sm:px-6',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]',
                isActive
                  ? 'bg-white text-[var(--green-dark)]'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon size={16} aria-hidden="true" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        className="relative min-h-[585px] overflow-hidden bg-white p-4 sm:min-h-[451px] sm:p-6 md:min-h-[228px] md:overflow-visible lg:min-h-[206px] xl:min-h-[150px] [&_label]:font-medium [&_label]:text-neutral-600"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 md:hidden"
          style={{
            backgroundImage: "url('/mobilehero.jpeg')",
            backgroundPosition: 'center top',
            backgroundSize: 'auto 200%',
          }}
        />
        <div className="relative z-10">{activeItem?.content}</div>
      </div>
    </div>
  )
}
