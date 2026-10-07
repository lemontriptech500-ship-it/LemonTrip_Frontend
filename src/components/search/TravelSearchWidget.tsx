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
    <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_18px_48px_-20px_rgba(4,45,27,0.32)]">
      <div
        role="tablist"
        aria-label="Search category"
        className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-neutral-100 bg-white px-3 pt-2 sm:px-5"
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
                'relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-xl px-4 py-3 text-[13px] font-medium transition-colors sm:px-6',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]',
                isActive
                  ? 'text-neutral-900 after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:rounded-full after:bg-[var(--green)]'
                  : 'text-neutral-500 hover:text-neutral-900'
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
        className="relative bg-white p-3 sm:p-5 md:overflow-visible"
      >
        <div className="relative z-10">{activeItem?.content}</div>
      </div>
    </div>
  )
}
