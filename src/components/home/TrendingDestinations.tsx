import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { trendingDestinations } from '@/data/destinations'
import { MapPin } from 'lucide-react'

export function TrendingDestinations() {
  return (
    <section className="section-gap bg-[var(--color-surface)]">
      <Container>
        <SectionHeading 
          title="Trending Destinations" 
          description="Explore the most popular places to visit right now."
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trendingDestinations.map((dest) => (
            <div 
              key={dest.id}
              className="group relative rounded-[var(--radius-lg)] overflow-hidden aspect-[4/3] cursor-pointer shadow-sm"
            >
              {dest.imageUrl ? (
                <img
                  src={dest.imageUrl}
                  alt={`${dest.name}, ${dest.country}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className={`absolute inset-0 h-full w-full ${dest.imageFallbackColor}`} />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-5 w-full text-white">
                <h3 className="text-h3 font-bold mb-0.5">{dest.name}</h3>
                <div className="flex items-center gap-1 text-white/80 text-sm mb-1.5">
                  <MapPin size={14} />
                  <span>{dest.country}</span>
                </div>
                <p className="text-body-sm text-white/85 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
