import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME, SITE_TAGLINE, FOOTER_NAV } from '@/constants'
import { NewsletterSignup } from './NewsletterSignup'
import { FooterAuthLink } from './FooterAuthLink'

function getAuthLink(href: string): { mode: 'signin' | 'signup'; requireAuth: boolean } | null {
  switch (href) {
    case '/login':
      return { mode: 'signin', requireAuth: false }
    case '/signup':
    case '/register':
      return { mode: 'signup', requireAuth: false }
    case '/profile':
      return { mode: 'signin', requireAuth: true }
    default:
      return null
  }
}

const SOCIALS = [
  { href: 'https://www.instagram.com/lemontripofficial?igsi=NWpxNjUwaWo4ODZp', label: 'Instagram', icon: <Instagram size={18} /> },
  { href: 'https://www.facebook.com/61590521547706', label: 'Facebook', icon: <Facebook size={18} /> },
  { href: 'https://whatsapp.com/channel/0029Vb8Tc6EAu3aMISxTov06', label: 'WhatsApp community', icon: <MessageCircle size={18} /> },
  { href: 'mailto:lemontripindia@gmail.com', label: 'Email', icon: <Mail size={18} /> },
]

const linkClass =
  'inline-block text-sm text-white/70 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] rounded-sm'

const headingClass = 'text-sm font-semibold text-white'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[var(--color-secondary)]" role="contentinfo">
      {/* Same directional green wash as the hero, so the two ends of the page match */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#042d1b]/80 via-transparent to-black/25"
        aria-hidden="true"
      />

      <Container className="relative py-12 lg:py-16">
        {/* Newsletter — glass panel, same treatment as the hero search widget */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
          <div className="max-w-xl">
            <NewsletterSignup />
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <span>Lemon</span>
              <span className="text-[var(--color-primary)]">Trip</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE} Book flights, hotels, and holiday packages with ease.
            </p>

            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns: FOOTER_NAV groups + Contact, all in one row on desktop */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h3 className={headingClass}>{group.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const auth = getAuthLink(link.href)
                    return (
                      <li key={link.href}>
                        {auth ? (
                          <FooterAuthLink href={link.href} mode={auth.mode} requireAuth={auth.requireAuth}>
                            {link.label}
                          </FooterAuthLink>
                        ) : (
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className={headingClass}>Contact</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <a href="mailto:lemontripindia@gmail.com" className={`${linkClass} break-all`}>
                    lemontripindia@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919812042030" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    WhatsApp us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="/privacy" className="transition-colors hover:text-[var(--color-primary)]">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--color-primary)]">
              Terms of service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}