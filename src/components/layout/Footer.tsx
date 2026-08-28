import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME, SITE_TAGLINE, FOOTER_NAV } from '@/constants'

// ============================================================
// Footer — Main application footer.
// ============================================================

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-text-primary)] text-white"
      role="contentinfo"
    >
      <Container className="py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand & Tagline - spans 4 columns on large screens */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-2xl font-extrabold tracking-tight text-white"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <span>Lemon</span>
              <span className="text-[var(--color-primary)]">Trip</span>
            </Link>
            <p className="text-body text-white/80 max-w-sm">
              {SITE_TAGLINE} Book flights, hotels, and holiday packages with ease.
            </p>
            
            {/* Social Placeholders */}
            <div className="flex items-center gap-4 mt-2">
              <SocialLink href="#" ariaLabel="Facebook" icon={<Facebook size={20} />} />
              <SocialLink href="#" ariaLabel="Twitter" icon={<Twitter size={20} />} />
              <SocialLink href="#" ariaLabel="Instagram" icon={<Instagram size={20} />} />
              <SocialLink href="#" ariaLabel="LinkedIn" icon={<Linkedin size={20} />} />
            </div>
          </div>

          {/* Navigation Links - spreads across remaining columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-12">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="text-body-sm font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-white/80 hover:text-white hover:underline transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-white/60 text-center md:text-left">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-caption text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function SocialLink({ href, ariaLabel, icon }: { href: string, ariaLabel: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--color-primary)] hover:text-[var(--color-text-primary)] transition-all duration-200"
    >
      {icon}
    </a>
  )
}
