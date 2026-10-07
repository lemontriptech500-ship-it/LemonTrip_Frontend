import React from 'react'
import Image from 'next/image'
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

const socials = [
  { href: 'https://www.instagram.com/lemontripofficial?igsi=NWpxNjUwaWo4ODZp', label: 'Instagram', icon: <Instagram size={18} /> },
  { href: 'https://www.facebook.com/61590521547706', label: 'Facebook', icon: <Facebook size={18} /> },
  { href: 'https://whatsapp.com/channel/0029Vb8Tc6EAu3aMISxTov06', label: 'WhatsApp community', icon: <MessageCircle size={18} /> },
  { href: 'mailto:lemontripindia@gmail.com', label: 'Email', icon: <Mail size={18} /> },
]

const linkClass = 'inline-flex text-sm leading-snug text-white/70 transition duration-200 hover:translate-x-1 hover:text-[var(--color-primary)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]'
const headingClass = 'text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#052f22] text-white" role="contentinfo">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(255,210,26,0.09),transparent_34%),linear-gradient(135deg,rgba(4,45,27,0.5),transparent_55%,rgba(0,0,0,0.22))]"
        aria-hidden="true"
      />
      <Container className="relative py-12 sm:py-14">
        <div className="grid gap-x-12 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-12 lg:pb-12">
          <section className="flex flex-col gap-4 lg:col-span-4" aria-label="About LemonTrip">
            <Link
              href="/"
              className="relative inline-flex h-[62px] w-[248px] max-w-full items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <Image
                src="/web_logo_news.png"
                alt="Official LemonTrip travel booking logo"
                width={2172}
                height={724}
                sizes="248px"
                className="h-full w-full object-contain object-left"
              />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              {SITE_TAGLINE} Book flights, hotels, and holiday packages with ease.
            </p>
            <div>
              <h2 className={headingClass}>Connect with us</h2>
              <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Social media">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-8 lg:gap-8">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={`${group.heading} footer links`}>
                <h2 className={headingClass}>{group.heading}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => {
                    const auth = getAuthLink(link.href)
                    return (
                      <li key={link.href}>
                        {auth ? (
                          <FooterAuthLink href={link.href} mode={auth.mode} requireAuth={auth.requireAuth}>
                            {link.label}
                          </FooterAuthLink>
                        ) : (
                          <Link href={link.href} className={linkClass}>{link.label}</Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className={headingClass}>Contact</h2>
              <ul className="mt-4 flex flex-col gap-3">
                <li><Link href="/contact" className={linkClass}>Contact us</Link></li>
                <li><a href="mailto:lemontripindia@gmail.com" className={`${linkClass} break-all`}>lemontripindia@gmail.com</a></li>
                <li><a href="https://wa.me/919812042030" target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 sm:py-9">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 shadow-[0_18px_45px_-32px_rgba(0,0,0,0.7)] sm:px-8">
            <NewsletterSignup />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/60">&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60 sm:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-[var(--color-primary)]">Privacy policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--color-primary)]">Terms of service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
