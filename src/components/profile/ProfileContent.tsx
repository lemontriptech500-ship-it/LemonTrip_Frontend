'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from '@/services/authService'
import { getUserBookings, type Booking } from '@/services/bookingService'
import { Container, Card, Button } from '@/components/ui'
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Settings,
  LogOut,
  Pencil,
  X,
  Check,
  Loader2,
  Wallet,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

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
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [travelUpdates, setTravelUpdates] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(false)

  useEffect(() => {
    if (hasHydrated && !user) router.replace('/login?callbackUrl=%2Fprofile')
  }, [hasHydrated, router, user])

  useEffect(() => {
    if (!hasHydrated || !user) return
    setBookingsLoading(true)
    getUserBookings()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false))
  }, [hasHydrated, user])

  useEffect(() => {
    if (!saved) return
    const timer = setTimeout(() => setSaved(false), 4000)
    return () => clearTimeout(timer)
  }, [saved])

  const initials = useMemo(() => (user ? getInitials(user.name) : ''), [user])

  if (!hasHydrated) return <ProfileSkeleton />
  if (!user) return null

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const startEditing = () => {
    setName(user.name)
    setPhone(user.phone || '')
    setError('')
    setSaved(false)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setError('')
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!name.trim()) return setError('Enter your full name.')
    if (phone.trim() && !PHONE_PATTERN.test(phone.trim()))
      return setError('Enter a valid phone number, for example +91 98765 43210.')

    setError('')
    setIsSaving(true)
    try {
      const updated = await updateProfile({ name: name.trim(), phone: phone.trim() })
      updateUser(updated)
      setIsEditing(false)
      setSaved(true)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'We could not save your changes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-[var(--color-background)] pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-24">
            <Card className="overflow-hidden p-0">
              <div className="flex items-center gap-4 border-b border-[var(--color-border-light)] p-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--green-dark)] text-lg font-semibold text-white"
                  aria-hidden="true"
                >
                  {initials || <User size={22} />}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-[var(--color-text-primary)]">{user.name}</h2>
                  <p className="truncate text-sm text-[var(--color-text-muted)]">{user.email}</p>
                </div>
              </div>

              <nav className="p-2" aria-label="Account navigation">
                <NavItem icon={<User size={18} />} label="Profile" active />
                <NavItem icon={<ShoppingBag size={18} />} label="My bookings" href="/bookings" />
                <NavItem icon={<Wallet size={18} />} label="Wallet" href="/wallet" />
                <NavItem icon={<Settings size={18} />} label="Preferences" href="/profile#preferences" />
                <div className="my-2 border-t border-[var(--color-border-light)]" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-error)]"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </nav>
            </Card>
          </aside>

          {/* Main */}
          <main className="min-w-0 space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
           
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-medium text-[var(--color-primary-dark)]">
                <ShieldCheck size={14} /> Active account
              </span>
            </div>

            {/* Summary */}
            <Card className="grid grid-cols-1 divide-y divide-[var(--color-border-light)] p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <Summary label="Total bookings" value={bookingsLoading ? '–' : String(bookings.length)} />
              <Summary label="Account type" value="Personal" />
              <Summary label="Wallet" value="Manage" href="/wallet" />
            </Card>

            {saved && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-success)] bg-[var(--color-success-bg)] px-4 py-3 text-sm font-medium text-[var(--color-success)]"
              >
                <CheckCircle2 size={18} /> Your profile has been updated.
              </div>
            )}

            {/* Personal information */}
            <Card className="p-0">
              <SectionHeader
                title="Personal information"
                description="Used to pre-fill traveller details when you book."
                action={
                  !isEditing ? (
                    <Button variant="outline" size="sm" icon={<Pencil size={15} />} onClick={startEditing}>
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" icon={<X size={15} />} onClick={cancelEditing} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        icon={isSaving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving…' : 'Save changes'}
                      </Button>
                    </div>
                  )
                }
              />

              {isEditing ? (
                <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
                  <Field id="profile-name" label="Full name" icon={<User size={16} />}>
                    <input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className={inputClass}
                    />
                  </Field>
                  <Field id="profile-phone" label="Phone number" icon={<Phone size={16} />}>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </Field>
                  <Field id="profile-email" label="Email address" icon={<Mail size={16} />} hint="Email can’t be changed here.">
                    <input id="profile-email" value={user.email} disabled className={`${inputClass} cursor-not-allowed opacity-60`} />
                  </Field>
                  <Field id="profile-location" label="Location" icon={<MapPin size={16} />} hint="Coming soon.">
                    <input id="profile-location" value="" placeholder="Not provided" disabled className={`${inputClass} cursor-not-allowed opacity-60`} />
                  </Field>
                  {error && (
                    <p role="alert" className="text-sm font-medium text-[var(--color-error)] md:col-span-2">
                      {error}
                    </p>
                  )}
                </div>
              ) : (
                <dl className="divide-y divide-[var(--color-border-light)]">
                  <InfoRow icon={<User size={16} />} label="Full name" value={user.name} />
                  <InfoRow icon={<Mail size={16} />} label="Email address" value={user.email} />
                  <InfoRow icon={<Phone size={16} />} label="Phone number" value={user.phone} />
                  <InfoRow icon={<MapPin size={16} />} label="Location" value={undefined} />
                </dl>
              )}
            </Card>

            {/* Recent bookings */}
            <Card className="p-0">
              <SectionHeader
                title="Recent bookings"
                action={
                  <Button variant="ghost" size="sm" asChild icon={<ChevronRight size={15} />} iconPosition="right">
                    <Link href="/bookings">View all</Link>
                  </Button>
                }
              />
              {bookingsLoading ? (
                <div className="space-y-3 p-5 sm:p-6" aria-busy="true">
                  <div className="h-12 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)]" />
                  <div className="h-12 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)]" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex flex-col items-start gap-3 p-5 sm:p-6">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    You have no bookings yet. Confirmed bookings appear here after payment.
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/flights">Search flights</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-light)]">
                  {bookings.slice(0, 5).map((booking) => (
                    <li key={booking.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]">
                          <ShoppingBag size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium capitalize text-[var(--color-text-primary)]">
                            {booking.type} booking
                          </p>
                          <p className="truncate text-xs text-[var(--color-text-muted)]">
                            Ref: {booking.bookingReference || booking.id}
                          </p>
                        </div>
                      </div>
                      <p className="shrink-0 text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                        ₹{booking.amount.toLocaleString('en-IN')}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Preferences */}
            <Card id="preferences" className="scroll-mt-24 p-0">
              <SectionHeader
                title="Notification preferences"
                description="Choose which updates you receive from LemonTrip."
              />
              <div className="divide-y divide-[var(--color-border-light)]">
                <SwitchRow
                  label="Travel updates"
                  description="Booking reminders and important itinerary changes."
                  checked={travelUpdates}
                  onChange={setTravelUpdates}
                />
                <SwitchRow
                  label="Price alerts"
                  description="Get notified when prices change for trips you’ve searched."
                  checked={priceAlerts}
                  onChange={setPriceAlerts}
                />
              </div>
            </Card>
          </main>
        </div>
      </Container>
    </div>
  )
}

const inputClass =
  'h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)]'

function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--color-border-light)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{description}</p>}
      </div>
      {action}
    </div>
  )
}

function Summary({ label, value, href }: { label: string; value: string; href?: string }) {
  const body = (
    <div className="px-5 py-4">
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">{value}</p>
    </div>
  )
  return href ? (
    <Link href={href} className="block transition hover:bg-[var(--color-surface-secondary)]">
      {body}
    </Link>
  ) : (
    body
  )
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
      <dt className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] sm:w-48 sm:shrink-0">
        <span className="text-[var(--color-text-muted)]">{icon}</span>
        {label}
      </dt>
      <dd className={`min-w-0 truncate text-sm ${value ? 'font-medium text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>
        {value || 'Not provided'}
      </dd>
    </div>
  )
}

function Field({ id, label, icon, hint, children }: { id: string; label: string; icon: ReactNode; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
        {icon}
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>}
    </div>
  )
}

function SwitchRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)] ${
          checked ? 'bg-[var(--green)]' : 'bg-[var(--color-border)]'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function NavItem({ icon, label, active = false, href }: { icon: ReactNode; label: string; active?: boolean; href?: string }) {
  const className = `flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green)] ${
    active
      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]'
      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'
  }`
  if (href)
    return (
      <Link href={href} className={className}>
        {icon}
        {label}
      </Link>
    )
  return (
    <div className={className} aria-current="page">
      {icon}
      {label}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="bg-[var(--color-background)] pb-16" aria-busy="true">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="h-72 animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-surface-secondary)]" />
          <div className="space-y-6">
            <div className="h-20 animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-surface-secondary)]" />
            <div className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-surface-secondary)]" />
          </div>
        </div>
      </Container>
    </div>
  )
}