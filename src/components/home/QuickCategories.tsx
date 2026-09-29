import React from 'react'
import Link from 'next/link'
import { Plane, Bed, BusFront, TrainFront, Briefcase, FileText } from 'lucide-react'
import { Container } from '@/components/ui'

/**
 * QuickCategories
 * ------------------------------------------------------------
 * Fix + restyle:
 *  - Removed `border-[var(--green)]` on a `bg-[var(--green)]` tile.
 *    At rest the border was invisible (same color as the fill),
 *    but on hover the background switches to `--green-2` while the
 *    border stayed `--green` — so hovering revealed a faint,
 *    unintentional-looking outline. Dropped the border and rely on
 *    the shadow for edge definition instead.
 *  - Corners bumped to rounded-2xl (tile) / rounded-xl (icon
 *    chip), matching the rounded-2xl/rounded-xl language used in
 *    WhyChooseUs and the other card grids.
 *  - Shadow switched from generic shadow-sm/shadow-md utilities to
 *    your --shadow-sm / --shadow-md tokens, consistent with the
 *    rest of the homepage.
 */

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
    <section className="border-b border-[var(--color-border-light)] bg-[var(--color-surface)] pb-12 pt-12 sm:pt-16 lg:pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center gap-2.5 rounded-2xl bg-[var(--green)] p-4 text-[var(--yellow)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--green-2)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="rounded-xl bg-white/15 p-3 text-[var(--yellow)] transition-colors duration-200 group-hover:bg-white/25">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="text-body-sm font-medium text-current">{cat.label}</span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}