import React from 'react'
import Image from 'next/image'
import { Container, SectionHeading } from '@/components/ui'
import { Layers, Zap, ShieldCheck, Headphones, PlaneTakeoff, CreditCard } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Layers,
    title: 'Multiple Travel Services',
    description: 'Flights, hotels, trains, buses, and packages all in one unified platform.',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Easy Booking Experience',
    description: 'A seamless, fast, and intuitive booking process designed for your convenience.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Visa Assistance',
    description: 'Comprehensive guidance and tracking for your international visa applications.',
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Industry-standard encryption to keep your transactions and data safe.',
  },
  {
    id: 5,
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Our dedicated team is here to assist you anytime, anywhere.',
  },
  {
    id: 6,
    icon: PlaneTakeoff,
    title: 'Transparent Information',
    description: 'No hidden fees. We believe in complete transparency for all your bookings.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-gap bg-[var(--color-surface)] relative overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.svg"
          alt=""
          width={500}
          height={500}
          className="w-[500px] h-[500px] object-contain opacity-[0.04]"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeading 
          title="Why Choose LemonTrip" 
          description="We are committed to providing you with the best travel booking experience."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.id} className="flex gap-4 p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] bg-[var(--color-surface)] hover:shadow-sm transition-shadow">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--green-dark)] flex items-center justify-center shadow-sm">
                    <Icon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-h4 mb-1.5">{feature.title}</h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
