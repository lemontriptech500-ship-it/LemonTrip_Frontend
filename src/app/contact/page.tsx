import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Card, Container } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the LemonTrip travel support team.',
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background)]">
      <section className="bg-[var(--green-dark)] py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-label text-[var(--yellow)]">We are here to help</p>
            <h1 className="mt-3 text-display text-white">Let&apos;s plan the next step.</h1>
            <p className="mt-5 max-w-2xl text-body-lg text-white/80">
              Have a question about a booking, destination, or travel service? Send us a message and the LemonTrip team will get back to you.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-gap">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="p-6 sm:p-8">
              <h2 className="text-h2">Send us a message</h2>
              <p className="mt-2 mb-7 text-body-sm text-[var(--color-text-secondary)]">Share the details and we&apos;ll route your message to the right person.</p>
              <ContactForm />
            </Card>

            <aside className="space-y-5">
              <Card className="bg-[var(--green-dark)] text-white">
                <h2 className="text-h3 text-white">Contact LemonTrip</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">For booking support and travel questions, reach us through any of these channels.</p>
                <div className="mt-6 space-y-5">
                  <a href="mailto:lemontripindia@gmail.com" className="flex items-start gap-3 text-sm text-white/85 hover:text-[var(--yellow)]"><Mail size={18} className="mt-0.5 shrink-0 text-[var(--yellow)]" /><span>lemontripindia@gmail.com</span></a>
                  <a href="tel:+919876543210" className="flex items-start gap-3 text-sm text-white/85 hover:text-[var(--yellow)]"><Phone size={18} className="mt-0.5 shrink-0 text-[var(--yellow)]" /><span>+91 98765 43210</span></a>
                  <div className="flex items-start gap-3 text-sm text-white/85"><MapPin size={18} className="mt-0.5 shrink-0 text-[var(--yellow)]" /><span>India, serving travelers worldwide</span></div>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  )
}
