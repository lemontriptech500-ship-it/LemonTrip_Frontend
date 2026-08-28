import React from 'react'
import { Phone, ShieldCheck, HelpCircle } from 'lucide-react'
import { Container } from '@/components/ui'

// ============================================================
// UtilityBar — Top slim bar above the main header.
// Used for global announcements, support links, or trust markers.
// ============================================================

export function UtilityBar() {
  return (
    <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] py-1.5 hidden sm:block">
      <Container className="flex items-center justify-between text-caption text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[var(--color-accent)]" />
            Secure & Trusted Bookings
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="tel:+1234567890" className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors">
            <Phone size={14} />
            24/7 Travel Assistance
          </a>
          <div className="w-px h-3 bg-[var(--color-border)]" />
          <button className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors">
            <HelpCircle size={14} />
            Need Help?
          </button>
        </div>
      </Container>
    </div>
  )
}
