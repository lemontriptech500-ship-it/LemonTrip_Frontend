'use client'

import React from 'react'
import { Modal } from '@/components/ui'
import { HotelSearchForm } from '@/components/search/HotelSearchForm'
import type { HotelSearchParams } from '@/types/hotels'

interface HotelModifySearchProps {
  isOpen: boolean
  onClose: () => void
  currentSearch: HotelSearchParams
}

export function HotelModifySearch({ isOpen, onClose, currentSearch }: HotelModifySearchProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modify hotel search" size="xl">
      <div className="pt-2">
        <HotelSearchForm
          key={`${currentSearch.destination}-${currentSearch.checkIn}-${currentSearch.checkOut}-${currentSearch.rooms}-${currentSearch.adults}-${currentSearch.children}`}
          defaults={currentSearch}
          onSuccess={onClose}
        />
      </div>
    </Modal>
  )
}
