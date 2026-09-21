'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from '@/services/authService'
import { getUserBookings, type Booking } from '@/services/bookingService'
import { Container, Card, Badge, Button } from '@/components/ui'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Settings,
  LogOut,
  Pencil,
  X,
  Check,
  Loader2,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'

export default function ProfileContent() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const logout = useAuthStore((state) => state.logout)
  const updateUser = useAuthStore((state) => state.updateUser)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (user) setName(user.name)
  }, [user])

  useEffect(() => {
    if (!hasHydrated || !user) return
    getUserBookings().then(setRecentBookings).catch(() => setRecentBookings([]))
  }, [hasHydrated, user])

  useEffect(() => {
    if (hasHydrated && !user) router.replace('/login?callbackUrl=%2Fprofile')
  }, [hasHydrated, router, user])

  if (!hasHydrated || !user) return null

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const startEditing = () => {
    setName(user.name)
    setPhone(user.phone || '')
    setError('')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setName(user.name)
    setPhone(user.phone || '')
    setError('')
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    setError('')
    setIsSaving(true)
    try {
      const updated = await updateProfile({ name: name.trim(), phone: phone.trim() })
      updateUser(updated)
      setIsEditing(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update your profile.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label text-[var(--color-primary-dark)]">Your account</p>
            <h1 className="mt-2 text-h1 text-[var(--color-text-primary)]">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="mt-2 max-w-xl text-body text-[var(--color-text-secondary)]">Keep your traveller details current and manage every trip from one place.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"><ShieldCheck size={16} className="text-[var(--color-success)]" /> Account protected</div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Card className="h-fit overflow-hidden p-0 lg:sticky lg:top-24">
            <div className="bg-[var(--green-dark)] px-5 py-6 text-center text-white">
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/20 bg-[var(--yellow)] text-[var(--green-dark)] shadow-lg"><User size={32} /></div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="mt-1 truncate text-xs text-white/70">{user.email}</p>
              <Badge variant="default" className="mt-4 border-0 bg-white/15 text-white">Personal account</Badge>
            </div>
            <nav className="space-y-1 p-3" aria-label="Profile navigation">
              <SidebarLink icon={<User size={16} />} label="Profile" active />
              <SidebarLink icon={<Wallet size={16} />} label="Wallet" href="/wallet" />
              <SidebarLink icon={<ShoppingBag size={16} />} label="My Bookings" href="/bookings" />
              <SidebarLink icon={<Settings size={16} />} label="Settings" href="/profile#settings" />
              <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error)]"><LogOut size={16} />Sign Out</button>
            </nav>
          </Card>

          <div className="min-w-0 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat icon={<ShoppingBag size={18} />} label="Bookings" value={String(recentBookings.length)} />
              <Stat icon={<Wallet size={18} />} label="Wallet" value="Manage" />
              <Stat icon={<ShieldCheck size={18} />} label="Status" value="Active" />
            </div>

            <Card className="p-5 sm:p-6">
              <div className="mb-6 flex flex-col gap-3 border-b border-[var(--color-border-light)] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-label text-[var(--color-primary-dark)]">Account details</p><h2 className="mt-1 text-h3">Personal Information</h2></div>
                {!isEditing ? <Button variant="outline" size="sm" icon={<Pencil size={15} />} onClick={startEditing}>Edit Profile</Button> : <div className="flex gap-2"><Button variant="ghost" size="sm" icon={<X size={15} />} onClick={cancelEditing} disabled={isSaving}>Cancel</Button><Button size="sm" icon={isSaving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button></div>}
              </div>
              {isEditing ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label><Info icon={<Mail size={18} />} label="Email" value={user.email} /><label className="text-sm font-medium text-[var(--color-text-secondary)]">Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="+91 98765 43210" className="mt-1 h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label><Info icon={<MapPin size={18} />} label="Location" value="Not provided" />{error && <p className="text-sm font-medium text-[var(--color-error)] md:col-span-2" role="alert">{error}</p>}</div> : <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Info icon={<User size={18} />} label="Full Name" value={user.name} /><Info icon={<Mail size={18} />} label="Email" value={user.email} /><Info icon={<Phone size={18} />} label="Phone" value={user.phone || 'Not provided'} /><Info icon={<MapPin size={18} />} label="Location" value="Not provided" /></div>}
            </Card>

            <Card className="p-5 sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-label text-[var(--color-primary-dark)]">Your journey</p><h2 className="mt-1 text-h3">Recent Bookings</h2></div><Button variant="ghost" size="sm" asChild icon={<ArrowUpRight size={15} />} iconPosition="right"><Link href="/bookings">View all</Link></Button></div>{recentBookings.length === 0 ? <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-5"><p className="font-medium text-[var(--color-text-primary)]">Your next adventure starts here.</p><p className="mt-1 text-sm text-[var(--color-text-muted)]">Confirmed bookings will appear here after payment.</p><Button className="mt-4" size="sm" asChild><Link href="/flights">Explore flights</Link></Button></div> : <div className="space-y-3">{recentBookings.map((booking) => <div key={booking.id} className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium capitalize text-[var(--color-text-primary)]">{booking.type} booking</p><p className="mt-1 text-xs text-[var(--color-text-muted)]">{booking.bookingReference || booking.id}</p></div><p className="font-semibold text-[var(--color-text-primary)]">₹{booking.amount.toLocaleString('en-IN')}</p></div>)}</div>}</Card>

            <Card className="p-5 sm:p-6"><div className="mb-5"><p className="text-label text-[var(--color-primary-dark)]">Shortcuts</p><h2 className="mt-1 text-h3">Quick Actions</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><QuickAction icon={<Calendar size={20} />} label="Book Flight" href="/flights" /><QuickAction icon={<ShoppingBag size={20} />} label="My Trips" href="/bookings" /><QuickAction icon={<Wallet size={20} />} label="Wallet" href="/wallet" /><QuickAction icon={<Settings size={20} />} label="Settings" href="/profile#settings" /></div></Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex min-w-0 items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">{icon}</div><div className="min-w-0"><p className="text-caption text-[var(--color-text-muted)]">{label}</p><p className="truncate text-body font-medium">{value}</p></div></div>
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex min-w-0 items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]">{icon}</div><div className="min-w-0"><p className="text-caption text-[var(--color-text-muted)]">{label}</p><p className="truncate text-sm font-bold text-[var(--color-text-primary)]">{value}</p></div></div>
}

function SidebarLink({ icon, label, active = false, href }: { icon: ReactNode; label: string; active?: boolean; href?: string }) {
  const className = `flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium transition ${active ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'}`
  if (href) return <Link href={href} className={className}>{icon}{label}</Link>
  return <button className={className}>{icon}{label}</button>
}

function QuickAction({ icon, label, href }: { icon: ReactNode; label: string; href?: string }) {
  const content = <><div className="text-[var(--color-primary-dark)] transition-transform group-hover:-translate-y-0.5">{icon}</div><span className="text-xs font-semibold text-[var(--color-text-secondary)]">{label}</span><ArrowUpRight size={13} className="text-[var(--color-text-muted)]" /></>
  return href ? <Link href={href} className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]">{content}</Link> : <button className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]">{content}</button>
}
