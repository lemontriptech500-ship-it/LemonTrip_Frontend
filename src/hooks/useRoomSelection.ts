'use client'

import { useMemo, useState } from 'react'
import type { Hotel, RoomSelection } from '@/types/hotels'
import { calculateSelectionsTotal, resolveSelection } from '@/lib/hotelUtils'

export function useRoomSelection(hotel: Hotel, nights: number, requested: { rooms: number; adults: number; children: number }) {
  const [selections, setSelections] = useState<RoomSelection[]>([])

  const selectedRoomCount = selections.reduce((sum, item) => sum + item.quantity, 0)
  const updateQuantity = (roomId: string, rateId: string, quantity: number) => {
    const room = hotel.rooms.find((item) => item.id === roomId)
    if (!room) return
    const occupiedByOtherRates = selections
      .filter((item) => item.roomId === roomId && item.rateId !== rateId)
      .reduce((sum, item) => sum + item.quantity, 0)
    const current = selections.find((item) => item.roomId === roomId && item.rateId === rateId)?.quantity ?? 0
    const max = Math.min(room.availableQuantity - occupiedByOtherRates, requested.rooms - (selectedRoomCount - current))
    const next = Math.max(0, Math.min(quantity, max))

    setSelections((previous) => {
      const withoutCurrent = previous.filter((item) => item.roomId !== roomId || item.rateId !== rateId)
      return next > 0 ? [...withoutCurrent, { roomId, rateId, quantity: next }] : withoutCurrent
    })
  }

  const resolved = useMemo(() => selections.map((selection) => ({ selection, resolved: resolveSelection(hotel, selection) })), [hotel, selections])
  const capacity = useMemo(() => resolved.reduce((total, item) => {
    if (!item.resolved) return total
    const { maxAdults, maxChildren, maxTotal } = item.resolved.room.maxOccupancy
    return {
      adults: total.adults + maxAdults * item.selection.quantity,
      children: total.children + maxChildren * item.selection.quantity,
      total: total.total + maxTotal * item.selection.quantity,
    }
  }, { adults: 0, children: 0, total: 0 }), [resolved])
  const invalidSelection = resolved.some((item) => !item.resolved || item.selection.quantity < 1 || item.selection.quantity > (item.resolved?.room.availableQuantity ?? 0))
  const validationMessage = invalidSelection
    ? 'One or more selected rooms are no longer available.'
    : selectedRoomCount !== requested.rooms
      ? `Select exactly ${requested.rooms} ${requested.rooms === 1 ? 'room' : 'rooms'} to continue.`
      : capacity.adults < requested.adults
        ? 'Your selected rooms do not accommodate all requested adults.'
        : capacity.children < requested.children
          ? 'Your selected rooms do not accommodate all requested children.'
          : capacity.total < requested.adults + requested.children
            ? 'Your selected rooms do not accommodate the requested guests.'
            : null
  const pricedItems = resolved.flatMap((item) => item.resolved ? [{ pricePerNight: item.resolved.rate.pricePerNight, quantity: item.selection.quantity }] : [])
  const total = calculateSelectionsTotal(pricedItems, nights, hotel.currency)

  return { selections, updateQuantity, selectedRoomCount, capacity, total, validationMessage, isValid: validationMessage === null, resolved }
}
