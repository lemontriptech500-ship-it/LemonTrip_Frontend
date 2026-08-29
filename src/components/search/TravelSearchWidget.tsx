'use client'

import React from 'react'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { Tabs } from '@/components/ui'
import { FlightSearchForm } from './FlightSearchForm'
import { HotelSearchForm } from './HotelSearchForm'
import { BusSearchForm } from './BusSearchForm'
import { TrainSearchForm } from './TrainSearchForm'
import { PackageSearchForm } from './PackageSearchForm'
import { VisaSearchForm } from './VisaSearchForm'

export function TravelSearchWidget() {
  const tabItems = [
    {
      id: 'flights',
      label: 'Flights',
      icon: <Plane size={16} />,
      content: <FlightSearchForm />,
    },
    {
      id: 'hotels',
      label: 'Hotels',
      icon: <Bed size={16} />,
      content: <HotelSearchForm />,
    },
    {
      id: 'bus',
      label: 'Buses',
      icon: <BusFront size={16} />,
      content: <BusSearchForm />,
    },
    {
      id: 'trains',
      label: 'Trains',
      icon: <TrainFront size={16} />,
      content: <TrainSearchForm />,
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: <Briefcase size={16} />,
      content: <PackageSearchForm />,
    },
    {
      id: 'visa',
      label: 'Visa',
      icon: <FileText size={16} />,
      content: <VisaSearchForm />,
    },
  ]

  return (
    <div className="bg-white rounded-[var(--radius-xl)] shadow-2xl border border-[var(--color-border)] overflow-hidden w-full max-w-5xl mx-auto">
      <Tabs
        items={tabItems}
        defaultTabId="flights"
        className="w-full"
        tabListClassName="px-3 sm:px-5 pt-1.5 bg-[var(--color-primary-soft)]/40"
        tabContentClassName="p-4 sm:p-6 lg:p-8"
      />
    </div>
  )
}
