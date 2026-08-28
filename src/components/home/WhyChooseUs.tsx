import React from 'react'
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
    <section className="section-gap bg-[var(--color-surface-secondary)]">
      <Container>
        <SectionHeading 
          title="Why Choose LemonTrip" 
          description="We are committed to providing you with the best travel booking experience."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.id} className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary-active)] flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-h4 mb-2">{feature.title}</h3>
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
