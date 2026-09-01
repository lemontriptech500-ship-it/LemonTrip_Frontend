import React from 'react'
import Link from 'next/link'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { Container } from '@/components/ui'

const categories = [
  { id: 'flights', label: 'Flights', icon: Plane, href: '/flights' },
  { id: 'hotels', label: 'Hotels', icon: Bed, href: '/hotels' },
  { id: 'bus', label: 'Buses', icon: BusFront, href: '/buses' },
  { id: 'trains', label: 'Trains', icon: TrainFront, href: '/trains' },
  { id: 'packages', label: 'Packages', icon: Briefcase, href: '/packages' },
  { id: 'visa', label: 'Visa', icon: FileText, href: '/visa' },
]

export function QuickCategories() {
  return (
    <section className="bg-[var(--color-surface)] pb-12 pt-12 sm:pt-16 lg:pt-20 border-b border-[var(--color-border-light)]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link 
                key={cat.id} 
                href={cat.href}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)] hover:shadow-sm hover:bg-[var(--color-primary-soft)] transition-all duration-200"
              >
                <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="text-body-sm font-medium text-[var(--color-text-primary)]">
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
