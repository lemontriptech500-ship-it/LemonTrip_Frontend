import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BusFront,
  FileText,
  Hotel,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
} from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Travel Services',
  description: 'Explore every travel service available through LemonTrip.',
}

const services = [
  {
    title: 'Flights',
    description: 'Compare routes, choose your fare, and book domestic or international flights.',
    href: '/flights',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
  },
  {
    title: 'Hotels',
    description: 'Find comfortable stays with flexible room, date, and guest options.',
    href: '/hotels',
    icon: Hotel,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85',
  },
  {
    title: 'Bus Tickets',
    description: 'Plan practical city-to-city journeys with a simple bus search experience.',
    href: '/buses',
    icon: BusFront,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=85',
  },
  {
    title: 'Train Tickets',
    description: 'Search routes and travel classes for smooth rail journeys across India.',
    href: '/trains',
    icon: TrainFront,
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=85',
  },
  {
    title: 'Holiday Packages',
    description: 'Discover curated itineraries with stays, experiences, and memorable escapes.',
    href: '/packages',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85',
  },
  {
    title: 'Visa Services',
    description: 'Understand requirements and get guided support for your travel documents.',
    href: '/visa',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&q=85',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-[var(--color-background)]">
      <section className="bg-[var(--green-dark)] py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-label text-[var(--yellow)]">Everything in one place</p>
            <h1 className="mt-3 text-display text-white">Travel planning, made simple.</h1>
            <p className="mt-5 max-w-2xl text-body-lg text-white/80">
              From the first search to the final itinerary, LemonTrip brings the essential travel services together in one clear experience.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-gap">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.href} padding="none" hover className="group flex h-full flex-col overflow-hidden">
                  <div className="relative h-44 overflow-hidden bg-[var(--green)]">
                    <Image src={service.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,59,36,0.82)] to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[var(--yellow)]">
                      <Icon size={18} aria-hidden="true" />
                      <h2 className="text-lg font-bold">{service.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-body-sm flex-1 text-[var(--color-text-secondary)]">{service.description}</p>
                    <Button variant="outline" className="mt-5 w-full" icon={<ArrowRight size={15} />} iconPosition="right" asChild>
                      <Link href={service.href}>Explore {service.title}</Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white py-12">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-[var(--green)]" size={24} />
              <div>
                <h2 className="text-h3">A smoother way to plan</h2>
                <p className="mt-1 text-body-sm text-[var(--color-text-secondary)]">Secure booking flows, clear information, and support when you need it.</p>
              </div>
            </div>
            <Button asChild icon={<ArrowRight size={15} />} iconPosition="right">
              <Link href="/flights">Start planning</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
