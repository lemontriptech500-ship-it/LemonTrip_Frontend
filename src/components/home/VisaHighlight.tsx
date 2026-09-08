import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { Globe2, FileText, CheckCircle, ArrowRight } from 'lucide-react'

export function VisaHighlight() {
  return (
    <section className="py-16 bg-[var(--green-dark)]">
      <Container>
        <div className="bg-[var(--green-dark)] rounded-[var(--radius-xl)] p-8 md:p-12 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10 border border-[var(--yellow)]/50 shadow-[0_18px_45px_rgba(6,59,36,0.18)]">
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[rgba(255,210,26,0.08)] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--yellow)] rounded-[var(--radius-sm)] text-xs font-bold text-[var(--green-dark)] mb-5 shadow-sm">
              <Globe2 size={14} />
              <span>LemonTrip Visa Services</span>
            </div>
            
            <h2 className="text-h1 text-[var(--yellow)] mb-5">
              Global Travel, Simplified Visas.
            </h2>
            
            <p className="text-body text-[var(--yellow)] mb-6 max-w-lg">
              Don&apos;t let visa complexities delay your travel plans. Explore requirements, check necessary documents, and track your application progress all in one place.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                'Tourist & Business Visas',
                'Document Checklists',
                'Application Tracking',
                'Expert Guidance'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[var(--yellow)]" />
                  <span className="text-sm font-medium text-[var(--yellow)]">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              iconPosition="right"
              icon={<ArrowRight size={16} className="text-[var(--green-dark)]" />}
              asChild
              className="!bg-[var(--yellow)] !text-[var(--green-dark)] !border !border-[var(--yellow)] !shadow-none hover:!bg-[var(--yellow)] hover:!text-[var(--green-dark)]"
            >
              <Link href="/visa" className="bg-[var(--green-dark)] text-[var(--yellow)] border border-[var(--yellow)] rounded-[inherit] px-4 py-2 inline-flex items-center gap-2">
                Explore Visa Services
              </Link>
            </Button>
          </div>

          <div className="relative z-10 hidden aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] border-4 border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg lg:flex lg:w-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&q=85"
              alt="Traveller preparing documents for an international journey"
              fill
              sizes="360px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(39, 174, 96, 0.60) to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 font-semibold text-[var(--color-primary)] text-sm">
              <FileText size={18} aria-hidden="true" />
              Travel documentation, simplified
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
