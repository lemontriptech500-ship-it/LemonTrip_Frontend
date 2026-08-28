import React from 'react'
import { Button } from '@/components/ui'
import type { Hotel, RoomSelection } from '@/types/hotels'
import { MEAL_PLAN_LABELS } from '@/types/hotels'
import { resolveSelection } from '@/lib/hotelUtils'
import { formatCurrency } from '@/lib/utils'

interface Props { hotel: Hotel; selections: RoomSelection[]; nights: number; total: number; validationMessage: string | null; onContinue: () => void }
export function RoomSelectionSummary({ hotel, selections, nights, total, validationMessage, onContinue }: Props) {
  const selected = selections.flatMap((item) => { const value = resolveSelection(hotel, item); return value ? [{ ...item, ...value }] : [] })
  return <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 lg:sticky lg:top-6"><h2 className="text-lg font-bold text-[var(--color-text-primary)]">Your room selection</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">{selections.reduce((sum, item) => sum + item.quantity, 0)} selected · {nights} {nights === 1 ? 'night' : 'nights'}</p><div className="my-4 space-y-3 border-y border-[var(--color-border-light)] py-4">{selected.length ? selected.map((item) => <div key={`${item.roomId}-${item.rateId}`} className="text-sm"><p className="font-medium text-[var(--color-text-primary)]">{item.quantity}× {item.room.name}</p><p className="text-[var(--color-text-secondary)]">{MEAL_PLAN_LABELS[item.rate.mealPlan]} · {item.rate.refundable ? 'Refundable' : 'Non-refundable'}</p></div>) : <p className="text-sm text-[var(--color-text-secondary)]">Choose a room rate to begin.</p>}</div><div className="flex justify-between gap-3"><span className="font-semibold text-[var(--color-text-primary)]">Accommodation total</span><span className="font-bold text-[var(--color-text-primary)]">{formatCurrency(total, hotel.currency)}</span></div><p className="mt-1 text-xs text-[var(--color-text-secondary)]">Room rates × nights × selected rooms. No taxes or fees added.</p>{validationMessage && <p role="alert" className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] p-3 text-sm text-[var(--color-warning)]">{validationMessage}</p>}<Button fullWidth className="mt-5" disabled={Boolean(validationMessage)} onClick={onContinue}>Continue to Guest Details</Button></aside>
}
