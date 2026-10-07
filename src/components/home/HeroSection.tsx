import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, Headphones, ShieldCheck } from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-900 pb-8 max-md:overflow-visible lg:h-[100svh] lg:min-h-[100svh] lg:bg-[#f6f3e9] lg:pb-0">
      {/* Keep the scenic image inside a framed, rounded panel. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 overflow-hidden bg-neutral-900 max-md:bottom-auto max-md:h-[100svh] max-md:rounded-none md:inset-x-4 md:bottom-4 md:top-[82px] md:rounded-[28px] lg:inset-x-5 lg:bottom-5 lg:top-5 lg:rounded-[34px]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/mobilehero.jpeg')", backgroundPosition: 'center 100%', backgroundSize: 'auto calc(100% + 200px)' }}
          role="img"
          aria-label="LemonTrip aircraft in a mountain landscape"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
          style={{ backgroundImage: "url('/heroooo.png')", backgroundPosition: 'center center' }}
          role="img"
          aria-label="Aircraft on the runway at dusk"
        />
        <div className="absolute inset-0 bg-[rgba(6,59,36,0.06)] max-md:bg-[rgba(3,31,24,0.14)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[rgba(3,31,24,0.34)] via-[rgba(3,31,24,0.08)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Restore the pale stepped corner and keep the navbar logo in its cutout. */}
      <div className="pointer-events-none absolute left-0 top-0 z-[60] hidden h-[125px] w-[230px] rounded-br-[34px] bg-[#f6f3e9] lg:block">
        <Link
          href="/"
          aria-label="LemonTrip home"
          className="pointer-events-auto absolute left-1/2 top-1/2 inline-flex h-[58px] w-[174px] -translate-x-1/2 -translate-y-1/2 items-center rounded-xl border border-white/90 bg-[var(--green-dark)] px-2 shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
        >
          <Image
            src="/web_logo_news.png"
            alt="LemonTrip"
            width={2172}
            height={724}
            className="h-full w-full object-contain object-left"
            priority
          />
        </Link>
      </div>

      {/* Hero title and supporting copy use the split composition from the reference. */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1100px] grid-cols-1 gap-5 px-4 lg:grid lg:w-[calc(100%-4rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:px-0 lg:pt-[168px]">
        <div className="text-left text-white">
          <h1 className="hidden max-w-[900px] font-heading text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] lg:block">
            LemonTrip: Your
            <br />
            Journey Begins Here.
          </h1>
        </div>

        <p className="hidden max-w-[360px] text-left text-sm leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-base lg:mt-8 lg:block lg:justify-self-start">
          Discover flights, stays and experiences for every kind of traveler. More than a destination. It’s a LemonTrip.
        </p>
      </div>

      <div
        className="absolute inset-x-0 z-10 mx-auto max-w-[560px] px-5 text-white lg:hidden"
        style={{ top: '72px' }}
      >
        <h1 className="text-center font-heading text-[clamp(2.5rem,9vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.48)]">
          Book your journey.
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
          Flights, hotels, buses, trains, holiday packages and visas from LemonTrip, at prices you can compare.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-3 text-[14px] font-medium">
          <div className="flex items-center gap-2"><BadgeCheck size={20} className="shrink-0 text-[var(--yellow)]" />Best price guarantee</div>
          <div className="flex items-center gap-2"><Headphones size={20} className="shrink-0 text-[var(--yellow)]" />24/7 support</div>
          <div className="col-span-2 flex items-center gap-2"><ShieldCheck size={20} className="shrink-0 text-[var(--yellow)]" />Safe &amp; secure booking</div>
        </div>
      </div>

      {/* Keep the search card in the hero on larger screens; let it flow below the copy on phones. */}
      <div className="relative z-20 mx-4 mt-0 max-w-[1100px] sm:mx-6 max-md:mt-[calc(100svh-190px)] lg:absolute lg:inset-x-8 lg:bottom-[38px] lg:mx-auto lg:mt-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}
