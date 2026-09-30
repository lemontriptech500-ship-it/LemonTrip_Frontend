import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME, SITE_TAGLINE, FOOTER_NAV } from '@/constants'
import { NewsletterSignup } from './NewsletterSignup'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-secondary)]" role="contentinfo">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 border-b border-[rgba(253,254,255,0.12)] pb-9 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link
              href="/"
              className="relative inline-flex h-[62px] w-[248px] max-w-full items-center transition-opacity hover:opacity-90"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <Image src="/website_logo.webp" alt={`${SITE_NAME} Logo`} fill sizes="248px" className="object-contain object-left" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[rgba(253,254,255,0.78)]">
              {SITE_TAGLINE} Book flights, hotels, and holiday packages with ease.
            </p>

            <div className="mt-1 flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">Connect With Us</h2>
              <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                  href="https://whatsapp.com/channel/0029Vb8Tc6EAu3aMISxTov06"
                  ariaLabel="Join our WhatsApp Community"
                  icon={<MessageCircle size={18} />}
                  label="Join our WhatsApp Community"
                />
                <SocialLink
                  href="mailto:lemontripindia@gmail.com"
                  ariaLabel="Email us"
                  icon={<Mail size={18} />}
                  label="lemontripindia@gmail.com"
                />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-8 lg:gap-8">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={`${group.heading} footer links`} className="flex flex-col gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                  {group.heading}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm leading-snug text-[rgba(253,254,255,0.82)] transition-colors hover:text-[var(--color-primary)]"
                      >
                        <span className="border-b border-transparent transition-all group-hover:border-[var(--color-primary)]">
                          {link.label}
                        </span>
                        <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">Contact</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex max-w-full items-center gap-1 break-words text-sm leading-snug text-[rgba(253,254,255,0.82)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:lemontripindia@gmail.com"
                    className="group inline-flex max-w-full items-center gap-1 break-words text-sm leading-snug text-[rgba(253,254,255,0.82)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
                      lemontripindia@gmail.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919812042030"
                    className="group inline-flex max-w-full items-center gap-1 break-words text-sm leading-snug text-[rgba(253,254,255,0.82)] transition-colors hover:text-[var(--color-primary)]"
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

        <NewsletterSignup />

        <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[rgba(253,254,255,0.62)]">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[rgba(253,254,255,0.62)] sm:justify-end">
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
