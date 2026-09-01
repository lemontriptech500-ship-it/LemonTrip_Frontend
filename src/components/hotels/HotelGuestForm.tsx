'use client'
import React from 'react'
import { Input, Button } from '@/components/ui'
import type { HotelGuest } from '@/types/hotels'
import type { ContactInformation } from '@/types/booking'
import { Mail, Phone, User } from 'lucide-react'

export type HotelGuestErrors = Partial<Record<'firstName' | 'lastName' | keyof ContactInformation, string>>
interface Props { guest: HotelGuest; contact: ContactInformation; errors: HotelGuestErrors; onGuestChange: (field: 'firstName' | 'lastName', value: string) => void; onContactChange: (field: keyof ContactInformation, value: string) => void; onSubmit: () => void }
export function HotelGuestForm({ guest, contact, errors, onGuestChange, onContactChange, onSubmit }: Props) {
 return <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Guest details</h1><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Enter the primary guest and contact details for this stay.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input required label="First name" value={guest.firstName} onChange={e => onGuestChange('firstName', e.target.value)} error={errors.firstName} leadingIcon={<User size={16} />} /><Input required label="Last name" value={guest.lastName} onChange={e => onGuestChange('lastName', e.target.value)} error={errors.lastName} leadingIcon={<User size={16} />} /><Input required wrapperClassName="sm:col-span-2" label="Email address" type="email" value={contact.email} onChange={e => onContactChange('email', e.target.value)} error={errors.email} leadingIcon={<Mail size={16} />} /><div className="sm:col-span-2"><label className="text-label text-[var(--color-text-primary)]">Phone number <span aria-hidden="true">*</span></label><div className="mt-1.5 flex gap-2"><Input aria-label="Country code" className="w-24" value={contact.phoneCode} onChange={e => onContactChange('phoneCode', e.target.value)} error={errors.phoneCode} /><Input aria-label="Phone number" type="tel" className="flex-1" value={contact.phoneNumber} onChange={e => onContactChange('phoneNumber', e.target.value)} error={errors.phoneNumber} leadingIcon={<Phone size={16} />} /></div></div></div><Button className="mt-6 w-full sm:w-auto" onClick={onSubmit}>Continue to Review</Button></section>
}
