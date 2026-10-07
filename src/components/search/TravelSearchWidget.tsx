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
 * TravelSearchWidget — compact category tabs above the search fields.
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
    <div className="mx-auto max-w-[960px] overflow-hidden rounded-[22px] border border-white/70 bg-white/95 shadow-[0_18px_48px_-20px_rgba(4,45,27,0.36)] backdrop-blur-xl max-md:rounded-[24px] max-md:border max-md:border-white/65 max-md:bg-[rgba(255,255,255,0.22)] max-md:backdrop-blur-md">
      <div className="flex flex-col gap-1 border-b border-neutral-200/80 px-4 pt-2 sm:flex-row sm:items-center sm:gap-4 sm:px-5 max-md:border-b max-md:border-white/25 max-md:bg-[rgba(4,45,27,0.72)] max-md:px-3 max-md:pt-3 max-md:backdrop-blur-lg">
        <h2 className="hidden shrink-0 text-base font-semibold tracking-tight text-[var(--green-dark)] md:block">
          Book Your Trip
        </h2>
        <div
          role="tablist"
          aria-label="Search category"
          className="hide-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto pb-1 max-md:gap-1.5 max-md:pb-0"
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
                  'relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors sm:px-3.5 max-md:px-3 max-md:py-2.5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]',
                  isActive
                    ? 'bg-[var(--green-dark)] text-white shadow-sm max-md:bg-white max-md:text-[var(--green-dark)]'
                    : 'text-neutral-500 hover:text-neutral-900 max-md:text-white/85 max-md:hover:text-white'
                )}
              >
                <Icon size={15} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        className="relative flex items-center bg-[#f8faf8] p-3 md:overflow-visible max-md:min-h-[170px] max-md:bg-[rgba(255,255,255,0.42)] max-md:backdrop-blur-md"
      >
        <div className="relative z-10 w-full">{activeItem?.content}</div>
      </div>
    </div>
  )
}