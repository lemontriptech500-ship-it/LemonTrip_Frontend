import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME, SITE_TAGLINE, FOOTER_NAV } from '@/constants'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-secondary)]" role="contentinfo">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight text-[#FDFEFE] hover:opacity-90 transition-opacity"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <span>Lemon</span>
              <span className="text-[var(--color-primary)]">Trip</span>
            </Link>
            <p className="text-sm text-[rgba(253,254,255,0.85)] max-w-sm leading-relaxed">
              {SITE_TAGLINE} Book flights, hotels, and holiday packages with ease.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">Connect With Us</h4>
              <div className="flex flex-col gap-2.5">
                <SocialLink
                  href="https://www.instagram.com/lemontripofficial?igsi=NWpxNjUwaWo4ODZp"
                  ariaLabel="Follow us on Instagram"
                  icon={<Instagram size={18} />}
                  label="@lemontripofficial"
                />
                <SocialLink
                  href="https://www.facebook.com/61590521547706"
                  ariaLabel="Follow us on Facebook"
                  icon={<Facebook size={18} />}
                  label="LemonTrip"
                />
                <SocialLink
                  href="https://wa.me/919876543210"
                  ariaLabel="Join our WhatsApp Community"
                  icon={<MessageCircle size={18} />}
                  label="WhatsApp Community"
                />
                <SocialLink
                  href="mailto:lemontripindia@gmail.com"
                  ariaLabel="Email us"
                  icon={<Mail size={18} />}
                  label="lemontripindia@gmail.com"
                />
              </div>
            </div>

            <NewsletterSignup />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-10">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-[rgba(253,254,255,0.85)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                          {link.label}
                        </span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Contact</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1 text-sm text-[rgba(253,254,255,0.85)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:lemontripindia@gmail.com"
                    className="group inline-flex items-center gap-1 text-sm text-[rgba(253,254,255,0.85)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                      lemontripindia@gmail.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    className="group inline-flex items-center gap-1 text-sm text-[rgba(253,254,255,0.85)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                      WhatsApp Us
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(253,254,255,0.12)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(253,254,255,0.65)] text-center md:text-left">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[rgba(253,254,255,0.65)]">
            <Link href="/privacy" className="hover:text-[var(--color-primary)] hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-primary)] hover:underline transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function SocialLink({ href, ariaLabel, icon, label }: { href: string; ariaLabel: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 text-sm text-[rgba(253,254,255,0.85)] hover:text-[#FDFEFE] transition-colors"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(253,254,255,0.10)] group-hover:bg-[var(--color-primary)] transition-all duration-200">
        {icon}
      </span>
      <span className="border-b border-transparent group-hover:border-[#FDFEFE] transition-all">{label}</span>
    </a>
  )
}
