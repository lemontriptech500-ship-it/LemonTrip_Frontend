import React from 'react'
import Link from 'next/link'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { Container } from '@/components/ui'

const categories = [
  { id: 'flights', label: 'Flights', icon: Plane, href: '/flights', color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent-soft)]' },
  { id: 'hotels', label: 'Hotels', icon: Bed, href: '/hotels', color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary-soft)]' },
  { id: 'bus', label: 'Buses', icon: BusFront, href: '/buses', color: 'text-[var(--color-secondary-hover)]', bg: 'bg-[var(--color-secondary-soft)]' },
  { id: 'trains', label: 'Trains', icon: TrainFront, href: '/trains', color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent-soft)]' },
  { id: 'packages', label: 'Packages', icon: Briefcase, href: '/packages', color: 'text-[var(--color-primary-active)]', bg: 'bg-[var(--color-primary-soft)]' },
  { id: 'visa', label: 'Visa', icon: FileText, href: '/visa', color: 'text-[var(--color-secondary-hover)]', bg: 'bg-[var(--color-secondary-soft)]' },
]

export function QuickCategories() {
  return (
    <section className="bg-white pb-12 pt-12 sm:pt-16 lg:pt-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link 
                key={cat.id} 
                href={cat.href}
                className="group flex flex-col items-center gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] hover:border-[var(--color-primary-soft)] hover:shadow-md hover:bg-[var(--color-surface-secondary)] transition-all duration-300"
              >
                <div className={`p-4 rounded-full ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className="text-body font-medium text-[var(--color-text-primary)]">
                  {cat.label}
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
