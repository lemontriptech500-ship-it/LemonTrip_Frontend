import React from 'react'
import { BadgeCheck, Headphones, ShieldCheck } from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-900 pb-8 max-md:min-h-0 max-md:overflow-visible max-md:bg-[#f8f7ef] max-md:pb-0 lg:h-[min(560px,68svh)] lg:min-h-[480px] lg:pb-0">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-neutral-900 max-md:bottom-[50%]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
          style={{
            backgroundImage: "url('/heroImage.png')",
            backgroundPosition: '62% 58%',
            backgroundSize: 'cover',
          }}
          role="img"
          aria-label="A traveller overlooking a coastal destination as a LemonTrip aircraft flies overhead"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
          style={{
            backgroundImage: "url('/heroImage.png')",
            backgroundPosition: 'center 72%',
            backgroundSize: 'cover',
          }}
          role="img"
          aria-label="A traveller overlooking a coastal destination as a LemonTrip aircraft flies overhead"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[rgba(3,31,24,0.76)] via-[rgba(3,31,24,0.38)] to-[rgba(3,31,24,0.08)] md:block" />
        <div className="absolute inset-0 bg-[rgba(3,31,24,0.1)] max-md:bg-[rgba(3,31,24,0.52)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent max-md:hidden" />
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-[1350px] px-8 lg:block xl:px-0 lg:pt-[clamp(76px,10svh,96px)]">
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--yellow)]/35 bg-[rgba(6,59,36,0.58)] px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-[var(--yellow)] backdrop-blur-sm">
          <span aria-hidden="true">✦</span> EXPLORE THE WORLD
        </p>
        <h1 className="mt-4 max-w-[760px] font-heading text-[clamp(3.25rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
          Your Next Adventure<br /><span className="text-[var(--yellow)]">Starts Here.</span>
        </h1>
        <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
          Flights, hotels, holidays and more — everything for your journey in one place. Plan your dream trip with LemonTrip.
        </p>
        <ul className="mt-5 flex items-center gap-0 text-white">
          <li className="flex items-center gap-2.5 pr-5"><BadgeCheck size={21} className="text-[var(--yellow)]" /><span className="max-w-[100px] text-xs font-semibold leading-tight">Best price<br />guarantee</span></li>
          <li className="flex items-center gap-2.5 border-l border-white/40 px-5"><Headphones size={21} className="text-[var(--yellow)]" /><span className="max-w-[105px] text-xs font-semibold leading-tight">24/7 traveler<br />assist</span></li>
          <li className="flex items-center gap-2.5 border-l border-white/40 pl-5"><ShieldCheck size={21} className="text-[var(--yellow)]" /><span className="max-w-[100px] text-xs font-semibold leading-tight">Safe &amp; secure<br />booking</span></li>
        </ul>
      </div>

      <div className="relative z-10 mx-auto block w-full max-w-[560px] px-5 pb-5 pt-[104px] text-white lg:hidden">
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--yellow)]/35 bg-[rgba(6,59,36,0.58)] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--yellow)]">✦ EXPLORE THE WORLD</p>
        <h1 className="max-w-[520px] font-heading text-[clamp(2.25rem,9vw,3.25rem)] font-semibold leading-[0.96] tracking-[-0.04em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.48)]">
          Your next adventure<br /><span className="text-[var(--yellow)]">starts here.</span>
        </h1>
        <p className="mt-4 max-w-[510px] text-[15px] leading-[1.5] text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-[17px]">
          Flights, hotels, buses, trains, holiday packages and visas from LemonTrip, at prices you can compare.
        </p>
        <div className="mt-5 grid grid-cols-3 divide-x divide-white/45 text-[11px] font-semibold leading-tight sm:text-[13px]">
          <div className="flex items-center gap-2 pr-2"><BadgeCheck size={22} className="shrink-0 text-[var(--yellow)]" /><span>Best price<br />guarantee</span></div>
          <div className="flex items-center gap-2 px-2"><Headphones size={22} className="shrink-0 text-[var(--yellow)]" /><span>24/7<br />support</span></div>
          <div className="flex items-center gap-2 pl-2"><ShieldCheck size={22} className="shrink-0 text-[var(--yellow)]" /><span>Safe &amp; secure<br />booking</span></div>
        </div>
      </div>

      <div className="relative z-20 mx-4 mt-0 max-w-[1120px] sm:mx-6 max-md:mx-3 max-md:mt-0 max-md:pb-7 lg:absolute lg:inset-x-8 lg:bottom-[18px] lg:mx-auto lg:mt-0 lg:pb-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}
