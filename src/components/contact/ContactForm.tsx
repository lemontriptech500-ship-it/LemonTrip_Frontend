'use client'

import { FormEvent, useState } from 'react'
import { Mail, Phone, Send, User } from 'lucide-react'
import { Alert, Button, Input, Textarea } from '@/components/ui'
import { apiRequest } from '@/lib/apiClient'

type ContactFormValues = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialValues: ContactFormValues = { name: '', email: '', phone: '', subject: '', message: '' }

export function ContactForm() {
  const [form, setForm] = useState(initialValues)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  function update(field: keyof ContactFormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setStatus(null)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const result = await apiRequest<{ message: string }>('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
        suppressErrorLog: true,
      })
      setForm(initialValues)
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to send your message right now.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      {status && <Alert variant={status.type === 'success' ? 'success' : 'error'}>{status.message}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" leadingIcon={<User size={17} />} autoComplete="name" required disabled={loading} />
        <Input label="Email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" leadingIcon={<Mail size={17} />} autoComplete="email" required disabled={loading} />
        <Input label="Phone" type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+91 98765 43210" leadingIcon={<Phone size={17} />} autoComplete="tel" required disabled={loading} />
        <Input label="Subject" value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="How can we help?" required disabled={loading} />
      </div>
      <Textarea label="Message" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us a little more about your question..." rows={7} maxLength={5000} required disabled={loading} />
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--color-text-muted)]">We usually reply within one business day.</p>
        <Button type="submit" loading={loading} icon={<Send size={16} />}>
          Send Message
        </Button>
      </div>
    </form>
  )
}
