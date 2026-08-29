import type { Metadata } from 'next'
import { Container, Card, Badge, Button } from '@/components/ui'
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Settings, LogOut } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your LemonTrip account and bookings.',
}

export default function ProfilePage() {
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-h3 mb-1">Guest User</h2>
              <p className="text-body-sm text-[var(--color-text-muted)] mb-4">guest@lemontrip.com</p>
              <Badge variant="info">Demo Account</Badge>

              <nav className="mt-6 space-y-1 text-left">
                <SidebarLink icon={<User size={16} />} label="Profile" active />
                <SidebarLink icon={<ShoppingBag size={16} />} label="My Bookings" />
                <SidebarLink icon={<Settings size={16} />} label="Settings" />
                <SidebarLink icon={<LogOut size={16} />} label="Sign Out" />
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="text-h3 mb-5">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] flex items-center justify-center">
                    <User size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-caption text-[var(--color-text-muted)]">Full Name</p>
                    <p className="text-body font-medium">Guest User</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] flex items-center justify-center">
                    <Mail size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-caption text-[var(--color-text-muted)]">Email</p>
                    <p className="text-body font-medium">guest@lemontrip.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] flex items-center justify-center">
                    <Phone size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-caption text-[var(--color-text-muted)]">Phone</p>
                    <p className="text-body font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] flex items-center justify-center">
                    <MapPin size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-caption text-[var(--color-text-muted)]">Location</p>
                    <p className="text-body font-medium">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Bookings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-h3">Recent Bookings</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                <BookingCard
                  title="Delhi to Mumbai Flight"
                  date="15 Sep 2026"
                  status="Confirmed"
                  statusVariant="success"
                  price="₹4,500"
                />
                <BookingCard
                  title="The Grand Imperial, Delhi"
                  date="20-22 Sep 2026"
                  status="Confirmed"
                  statusVariant="success"
                  price="₹8,200"
                />
                <BookingCard
                  title="Summer Getaway Package"
                  date="Pending"
                  status="Processing"
                  statusVariant="warning"
                  price="₹15,000"
                />
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-h3 mb-5">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickAction icon={<Calendar size={20} />} label="Book Flight" />
                <QuickAction icon={<ShoppingBag size={20} />} label="My Trips" />
                <QuickAction icon={<Settings size={20} />} label="Settings" />
                <QuickAction icon={<User size={20} />} label="Support" />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
        active
          ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function BookingCard({ title, date, status, statusVariant, price }: {
  title: string
  date: string
  status: string
  statusVariant: 'success' | 'warning' | 'error'
  price: string
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors">
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
        <p className="text-caption text-[var(--color-text-muted)] mt-0.5">{date}</p>
      </div>
      <div className="text-right">
        <Badge variant={statusVariant}>{status}</Badge>
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-1">{price}</p>
      </div>
    </div>
  )
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all">
      <div className="text-[var(--color-primary)]">{icon}</div>
      <span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span>
    </button>
  )
}
