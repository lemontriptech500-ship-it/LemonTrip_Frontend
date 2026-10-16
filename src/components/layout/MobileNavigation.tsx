'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'
import { useAuthModalStore } from '@/store/authModalStore'
import { useAuthStore } from '@/store/authStore'

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const trigger = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)
  const openAuthModal = useAuthModalStore((state) => state.open)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  useEffect(() => { setIsOpen(false) }, [pathname])
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    drawer.current?.querySelector<HTMLButtonElement>('button')?.focus()
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); return }
      if (event.key !== 'Tab') return
      const targets = drawer.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!targets?.length) return
      const first = targets[0], last = targets[targets.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    const resize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    document.addEventListener('keydown', keyboard)
    window.addEventListener('resize', resize)
    const opener = trigger.current
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', keyboard)
      window.removeEventListener('resize', resize)
      opener?.focus()
    }
  }, [isOpen])
  const active = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
  const close = () => setIsOpen(false)
  const openAuth = () => { close(); openAuthModal('signin') }
  return <div className="flex items-center md:hidden">
    <button ref={trigger} type="button" onClick={() => setIsOpen(true)} aria-label="Open mobile menu" aria-expanded={isOpen} aria-controls={isOpen ? 'mobile-navigation' : undefined} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--yellow)]">
      <Menu size={22} aria-hidden="true" />
    </button>
    {isOpen && createPortal(<div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-[#031f18]/60 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div ref={drawer} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu" className="absolute right-0 top-0 flex h-dvh w-[min(90vw,380px)] flex-col bg-white text-[var(--green-dark)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <span className="font-heading text-3xl font-semibold">Your next adventure</span>
          <button type="button" onClick={close} aria-label="Close mobile menu" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-[var(--color-background-soft)]"><X size={22} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Mobile navigation" className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
          <Link href="/trip-planner" onClick={close} aria-current={active('/trip-planner') ? 'page' : undefined} className="mb-3 flex min-h-14 items-center gap-3 rounded-2xl bg-[var(--yellow)] px-4 text-sm font-bold"><Sparkles size={19} aria-hidden="true" /> Plan with AI <ArrowUpRight size={18} className="ml-auto" aria-hidden="true" /></Link>
          {NAV_ITEMS.filter((item) => item.href !== '/trip-planner').map((item) => <Link key={item.href} href={item.href} onClick={close} aria-current={active(item.href) ? 'page' : undefined} className={cn('flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold transition hover:bg-[var(--color-background-soft)]', active(item.href) && 'bg-[var(--color-background-soft)] text-[var(--green-2)] ring-1 ring-[var(--color-border)]')}>{item.label}</Link>)}
          {[{ href: '/wishlist', label: 'Wishlist' }, { href: '/contact', label: 'Contact & Help' }].map((item) => <Link key={item.href} href={item.href} onClick={close} aria-current={active(item.href) ? 'page' : undefined} className={cn('flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold hover:bg-[var(--color-background-soft)]', active(item.href) && 'bg-[var(--color-background-soft)] text-[var(--green-2)]')}>{item.label}</Link>)}
        </nav>
        <div className="border-t border-[var(--color-border)] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {hasHydrated && isAuthenticated ? <Link href="/profile" onClick={close} className="flex min-h-11 items-center justify-center rounded-full bg-[var(--green-dark)] px-5 text-sm font-semibold text-white">My account</Link> : <button type="button" onClick={openAuth} className="min-h-11 w-full rounded-full bg-[var(--green-dark)] px-5 text-sm font-semibold text-white">Sign in / Create account</button>}
        </div>
      </div>
    </div>, document.body)}
  </div>
}
