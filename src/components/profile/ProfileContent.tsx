'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Container, Card, Badge, Button } from '@/components/ui'
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Settings, LogOut } from 'lucide-react'

export default function ProfileContent() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (hasHydrated && !user) router.replace('/login?callbackUrl=%2Fprofile')
  }, [hasHydrated, router, user])

  if (!hasHydrated || !user) return null

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <div className="section-gap bg-[var(--color-background)]"><Container><div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <Card className="p-6 text-center lg:col-span-1"><div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"><User size={32} className="text-[var(--color-primary)]" /></div><h1 className="text-h3 mb-1">{user.name}</h1><p className="text-body-sm mb-4 text-[var(--color-text-muted)]">{user.email}</p><Badge variant="info">Account</Badge><nav className="mt-6 space-y-1 text-left"><SidebarLink icon={<User size={16} />} label="Profile" active /><SidebarLink icon={<ShoppingBag size={16} />} label="My Bookings" /><SidebarLink icon={<Settings size={16} />} label="Settings" /><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm font-medium text-[var(--color-text-secondary)]"><LogOut size={16} />Sign Out</button></nav></Card>
      <div className="space-y-6 lg:col-span-3"><Card className="p-6"><h2 className="text-h3 mb-5">Personal Information</h2><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><Info icon={<User size={18} />} label="Full Name" value={user.name} /><Info icon={<Mail size={18} />} label="Email" value={user.email} /><Info icon={<Phone size={18} />} label="Phone" value={user.phone || 'Not provided'} /><Info icon={<MapPin size={18} />} label="Location" value="Not provided" /></div></Card><Card className="p-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-h3">Recent Bookings</h2><Button variant="ghost" size="sm" asChild><a href="/bookings">View All</a></Button></div><p className="text-sm text-[var(--color-text-muted)]">Your confirmed bookings will appear here after backend integration.</p></Card><Card className="p-6"><h2 className="text-h3 mb-5">Quick Actions</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><QuickAction icon={<Calendar size={20} />} label="Book Flight" /><QuickAction icon={<ShoppingBag size={20} />} label="My Trips" /><QuickAction icon={<Settings size={20} />} label="Settings" /><QuickAction icon={<User size={20} />} label="Support" /></div></Card></div>
    </div></Container></div>
  )
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">{icon}</div><div><p className="text-caption text-[var(--color-text-muted)]">{label}</p><p className="text-body font-medium">{value}</p></div></div> }
function SidebarLink({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) { return <button className={`flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm font-medium ${active ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>{icon}{label}</button> }
function QuickAction({ icon, label }: { icon: ReactNode; label: string }) { return <button className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"><div className="text-[var(--color-primary)]">{icon}</div><span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span></button> }
