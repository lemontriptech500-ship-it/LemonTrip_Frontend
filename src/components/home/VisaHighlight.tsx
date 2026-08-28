import React from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { Globe2, FileText, CheckCircle, ArrowRight } from 'lucide-react'

export function VisaHighlight() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="bg-[var(--color-primary-soft)] rounded-[var(--radius-2xl)] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border border-[var(--color-primary)]/20">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          {/* Content */}
          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm font-bold text-[var(--color-primary-active)] mb-6 shadow-sm border border-[var(--color-border-light)]">
              <Globe2 size={16} />
              <span>LemonTrip Visa Services</span>
            </div>
            
            <h2 className="text-display text-[var(--color-text-primary)] mb-6">
              Global Travel, <br />Simplified Visas.
            </h2>
            
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-8 max-w-xl">
              Don&apos;t let visa complexities delay your travel plans. Explore requirements, check necessary documents, and track your application progress all in one place.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Tourist & Business Visas',
                'Document Checklists',
                'Application Tracking',
                'Expert Guidance'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-[var(--color-primary-active)]" />
                  <span className="font-medium text-[var(--color-text-primary)]">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" iconPosition="right" icon={<ArrowRight size={18} />} asChild>
              <Link href="/visa">Explore Visa Services</Link>
            </Button>
          </div>

          <div className="relative z-10 hidden aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border-8 border-white bg-white shadow-2xl lg:flex lg:w-[400px]">
            <img
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&q=85"
              alt="Traveller preparing documents for an international journey"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/70 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 font-semibold text-white">
              <FileText size={20} aria-hidden="true" />
              Travel documentation, simplified
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
