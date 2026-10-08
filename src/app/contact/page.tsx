import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Card, Container } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

export const metadata: Metadata = {
  title: 'Contact LemonTrip | Travel & Booking Support',
  description: 'Contact LemonTrip for travel, booking, and customer support.',
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background)]">
      <FlightPageHero
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="How can we help?"
        subtitle="Our travel support team can help with bookings, destinations, and everything you need for a smoother journey."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:gap-8">
            <Card className="p-5 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--green-2)]">Talk to our team</p>
              <h2 className="mt-1 font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)] sm:text-4xl">Send us a message</h2>
              <p className="mt-2 mb-6 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">Share a few details and we&apos;ll send your request to the right travel support teammate.</p>
              <ContactForm />
            </Card>

            <aside className="space-y-4">
              <Card className="bg-[var(--green-dark)] p-5 text-white sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[var(--yellow)]"><MessageCircle size={21} aria-hidden="true" /></span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--yellow)]">LemonTrip support</p>
                    <h2 className="mt-0.5 font-heading text-2xl font-semibold text-white">We&apos;re happy to help</h2>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">Choose the contact option that works best for you.</p>
                <div className="mt-5 space-y-3">
                  <a href="mailto:lemontripindia@gmail.com" className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-white/90 transition hover:border-[var(--yellow)]/50 hover:bg-white/10">
                    <Mail size={17} className="shrink-0 text-[var(--yellow)]" aria-hidden="true" /><span className="break-all">lemontripindia@gmail.com</span>
                  </a>
                  <a href="tel:+919876543210" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-white/90 transition hover:border-[var(--yellow)]/50 hover:bg-white/10">
                    <Phone size={17} className="shrink-0 text-[var(--yellow)]" aria-hidden="true" /><span>+91 98765 43210</span>
                  </a>
                  <div className="flex items-center gap-3 px-3 pt-1 text-sm text-white/75">
                    <MapPin size={17} className="shrink-0 text-[var(--yellow)]" aria-hidden="true" /><span>India, serving travelers worldwide</span>
                  </div>
                </div>
              </Card>

              <Card className="border-[var(--color-border)] bg-[#f0f7f2] p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">Already booked?</p>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-[var(--green-dark)]">Find your trip details</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">Visit your bookings to review references and payment status.</p>
                <Link href="/bookings" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--green-dark)] hover:text-[var(--green-2)]">
                  Go to my bookings <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  )
}
