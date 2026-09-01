import React from 'react'
import { BedDouble, Check, Minus, Plus, Users } from 'lucide-react'
import { Badge } from '@/components/ui'
import type { Room, RoomSelection } from '@/types/hotels'
import { MEAL_PLAN_LABELS } from '@/types/hotels'
import { formatCurrency } from '@/lib/utils'

interface RoomCardProps { room: Room; selections: RoomSelection[]; onQuantityChange: (roomId: string, rateId: string, quantity: number) => void; selectedRoomCount: number; requestedRooms: number }

export function RoomCard({ room, selections, onQuantityChange, selectedRoomCount, requestedRooms }: RoomCardProps) {
  const roomSelections = selections.filter((item) => item.roomId === room.id)
  const roomSelectedCount = roomSelections.reduce((sum, item) => sum + item.quantity, 0)
  return <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div><h3 className="text-lg font-bold text-[var(--color-text-primary)]">{room.name}</h3><p className="text-sm text-[var(--color-text-secondary)]">{room.description}</p></div>
      <Badge variant="neutral">{room.type}</Badge>
    </div>
    <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]"><span className="inline-flex items-center gap-1"><BedDouble size={16} aria-hidden />{room.bedType}</span><span className="inline-flex items-center gap-1"><Users size={16} aria-hidden />Up to {room.maxOccupancy.maxAdults} adults, {room.maxOccupancy.maxChildren} children</span></div>
    <div className="mt-3 flex flex-wrap gap-2">{room.amenities.slice(0, 4).map((amenity) => <Badge key={amenity} variant="neutral">{amenity}</Badge>)}</div>
    <div className="mt-5 space-y-3" role="group" aria-label={`Rates for ${room.name}`}>
      {room.rates.map((rate) => {
        const quantity = roomSelections.find((item) => item.rateId === rate.id)?.quantity ?? 0
        const maxForRate = Math.min(room.availableQuantity - (roomSelectedCount - quantity), requestedRooms - (selectedRoomCount - quantity))
        return <div key={rate.id} className={`rounded-[var(--radius-md)] border p-4 ${quantity ? 'border-[var(--color-primary)] bg-[rgba(39, 174, 96, 0.05)' : 'border-[var(--color-border-light)]'}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-[var(--color-text-primary)]">{rate.name}</h4>{rate.refundable ? <Badge variant="success">Refundable</Badge> : <Badge variant="neutral">Non-refundable</Badge>}</div><p className="mt-1 text-sm text-[var(--color-text-secondary)]">{MEAL_PLAN_LABELS[rate.mealPlan]} · {rate.cancellationPolicy}</p>{rate.benefits.map((benefit) => <p key={benefit} className="mt-1 flex items-center gap-1 text-xs text-[var(--color-text-secondary)]"><Check size={13} aria-hidden />{benefit}</p>)}</div><div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-right"><p className="font-bold text-[var(--color-text-primary)]">{formatCurrency(rate.pricePerNight, rate.currency)}</p><p className="text-xs text-[var(--color-text-secondary)]">per night</p></div><div className="flex items-center gap-2" aria-label={`${room.name}, ${rate.name} quantity`}><button type="button" aria-label={`Remove one ${room.name}, ${rate.name}`} disabled={quantity === 0} onClick={() => onQuantityChange(room.id, rate.id, quantity - 1)} className="h-9 w-9 rounded border border-[var(--color-border)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"><Minus size={16} className="mx-auto" /></button><span aria-live="polite" className="w-5 text-center font-semibold">{quantity}</span><button type="button" aria-label={`Add one ${room.name}, ${rate.name}`} disabled={quantity >= maxForRate} onClick={() => onQuantityChange(room.id, rate.id, quantity + 1)} className="h-9 w-9 rounded border border-[var(--color-primary)] text-[var(--color-primary)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"><Plus size={16} className="mx-auto" /></button></div></div></div>
        </div>
      })}
    </div>
  </article>
}
