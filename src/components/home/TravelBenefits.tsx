import React from 'react'
import { Building2, ShieldCheck, Gift, ThumbsUp, Headphones } from 'lucide-react'

const benefits = [
  {
    title: 'Handpicked Hotels',
    description: 'Quality stays across the globe',
    icon: Building2,
  },
  {
    title: 'Best Price Guarantee',
    description: 'Get the best deals on every booking',
    icon: ShieldCheck,
  },
  {
    title: 'Exclusive Packages',
    description: 'Curated experiences just for you',
    icon: Gift,
  },
  {
    title: 'Easy Bookings',
    description: 'Book in minutes with ease',
    icon: ThumbsUp,
  },
  {
    title: '24/7 Support',
    description: 'We are here for you always',
    icon: Headphones,
  },
]

export function TravelBenefits() {
  return (
    <section className="w-full bg-white py-[18px]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-nowrap lg:flex-nowrap md:flex-wrap gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide pb-2 sm:pb-0">
          {benefits.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="snap-start flex-1 min-w-[160px] sm:min-w-[200px] max-w-[250px] bg-white border border-[#EEEEEE] rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
              >
                <div className="shrink-0 flex items-center justify-center w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-full bg-[#FFF8D8]">
                  <Icon size={18} className="text-[#075B35] sm:hidden" strokeWidth={2} />
                  <Icon size={22} className="text-[#075B35] hidden sm:block" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-[#172019] text-[13px] sm:text-[14px] font-semibold leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-[#69736D] text-[11px] sm:text-[12px] leading-snug mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
