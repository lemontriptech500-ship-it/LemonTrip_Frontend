import React from 'react'
import { Plane } from 'lucide-react'
import type { Flight } from '@/types/flights'

interface FlightDetailsHeaderProps { flight: Flight }

export function FlightDetailsHeader({ flight }: FlightDetailsHeaderProps) {
  const formatTime = (value: string) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formatDate = (value: string) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#063b24] via-[#0b512e] to-[#173e14] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[var(--yellow)]/10 blur-3xl" aria-hidden />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--yellow)] font-bold text-[var(--green-dark)]">{flight.airlineCode}</span>
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--yellow)]">Flight itinerary</p><h2 className="mt-1 text-lg font-bold sm:text-xl">{flight.airline}</h2><p className="text-sm text-white/75">Flight {flight.flightNumber}</p></div>
        </div>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
      </div>
      <div className="relative mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div><p className="text-3xl font-bold tracking-tight sm:text-4xl">{formatTime(flight.departureTime)}</p><p className="mt-1 font-semibold">{flight.origin}</p><p className="text-sm text-white/70">{formatDate(flight.departureTime)}</p></div>
        <div className="flex items-center gap-2 text-sm text-white/75 sm:flex-col"><span className="h-px w-10 bg-white/30 sm:h-8 sm:w-px"/><Plane size={18} className="text-[var(--yellow)]"/><span>{Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m</span><span className="h-px w-10 bg-white/30 sm:h-8 sm:w-px"/></div>
        <div className="sm:text-right"><p className="text-3xl font-bold tracking-tight sm:text-4xl">{formatTime(flight.arrivalTime)}</p><p className="mt-1 font-semibold">{flight.destination}</p><p className="text-sm text-white/70">{formatDate(flight.arrivalTime)}</p></div>
      </div>
    </section>
  )
}
