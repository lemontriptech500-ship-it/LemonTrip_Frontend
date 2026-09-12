'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from '@/services/authService'
import { getUserBookings, type Booking } from '@/services/bookingService'
import { Container, Card, Badge, Button } from '@/components/ui'
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Settings, LogOut, Pencil, X, Check, Loader2, Wallet } from 'lucide-react'

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
    if (user) {
      setName(user.name)
    }
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
    <div className="section-gap bg-[var(--color-background)]"><Container><div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <Card className="p-6 text-center lg:col-span-1"><div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"><User size={32} className="text-[var(--color-primary)]" /></div><h1 className="text-h3 mb-1">{user.name}</h1><p className="text-body-sm mb-4 text-[var(--color-text-muted)]">{user.email}</p><Badge variant="info">Account</Badge><nav className="mt-6 space-y-1 text-left"><SidebarLink icon={<User size={16} />} label="Profile" active /><SidebarLink icon={<Wallet size={16} />} label="Wallet" href="/wallet" /><SidebarLink icon={<ShoppingBag size={16} />} label="My Bookings" /><SidebarLink icon={<Settings size={16} />} label="Settings" /><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm font-medium text-[var(--color-text-secondary)]"><LogOut size={16} />Sign Out</button></nav></Card>
      <div className="space-y-6 lg:col-span-3"><Card className="p-6"><div className="mb-5 flex items-center justify-between gap-4"><h2 className="text-h3">Personal Information</h2>{!isEditing ? <Button variant="outline" size="sm" icon={<Pencil size={15} />} onClick={startEditing}>Edit Profile</Button> : <div className="flex gap-2"><Button variant="ghost" size="sm" icon={<X size={15} />} onClick={cancelEditing} disabled={isSaving}>Cancel</Button><Button size="sm" icon={isSaving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button></div>}</div>{isEditing ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label><div><Info icon={<Mail size={18} />} label="Email" value={user.email} /></div><label className="text-sm font-medium text-[var(--color-text-secondary)]">Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="+91 98765 43210" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" /></label><Info icon={<MapPin size={18} />} label="Location" value="Not provided" />{error && <p className="text-sm font-medium text-[var(--color-error)] md:col-span-2" role="alert">{error}</p>}</div> : <div className="grid grid-cols-1 gap-5 md:grid-cols-2"><Info icon={<User size={18} />} label="Full Name" value={user.name} /><Info icon={<Mail size={18} />} label="Email" value={user.email} /><Info icon={<Phone size={18} />} label="Phone" value={user.phone || 'Not provided'} /><Info icon={<MapPin size={18} />} label="Location" value="Not provided" /></div>}</Card><Card className="p-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-h3">Recent Bookings</h2><Button variant="ghost" size="sm" asChild><a href="/bookings">View All</a></Button></div>{recentBookings.length === 0 ? <p className="text-sm text-[var(--color-text-muted)]">Your confirmed bookings will appear here after payment.</p> : <div className="space-y-3">{recentBookings.map((booking) => <div key={booking.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-3"><div><p className="font-medium text-[var(--color-text-primary)]">{booking.type} booking</p><p className="text-xs text-[var(--color-text-muted)]">{booking.bookingReference || booking.id}</p></div><p className="font-semibold text-[var(--color-text-primary)]">₹{booking.amount.toLocaleString('en-IN')}</p></div>)}</div>}</Card><Card className="p-6"><h2 className="text-h3 mb-5">Quick Actions</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><QuickAction icon={<Calendar size={20} />} label="Book Flight" /><QuickAction icon={<ShoppingBag size={20} />} label="My Trips" /><QuickAction icon={<Settings size={20} />} label="Settings" /><QuickAction icon={<User size={20} />} label="Support" /></div></Card></div>
    </div></Container></div>
  )
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">{icon}</div><div><p className="text-caption text-[var(--color-text-muted)]">{label}</p><p className="text-body font-medium">{value}</p></div></div> }
function SidebarLink({ icon, label, active = false, href }: { icon: ReactNode; label: string; active?: boolean; href?: string }) { const className = `flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm font-medium ${active ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`; if (href) return <Link href={href} className={className}>{icon}{label}</Link>; return <button className={className}>{icon}{label}</button> }
function QuickAction({ icon, label, href }: { icon: ReactNode; label: string; href?: string }) { const content = <><div className="text-[var(--color-primary)]">{icon}</div><span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span></>; return href ? <Link href={href} className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4">{content}</Link> : <button className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4">{content}</button> }
