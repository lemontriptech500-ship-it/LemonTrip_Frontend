'use client'

import { useState } from 'react'
import { Alert, Button, Card, Input } from '@/components/ui'
import { submitVisaApplication } from '@/services/visaService'

const passportTypes = ['application/pdf', 'image/jpeg', 'image/png']
const photoTypes = ['image/jpeg', 'image/png']

type DocumentField = 'passportFront' | 'passportBack' | 'photograph'
type FormValues = { fullName: string; email: string; passportNumber: string; intendedEntryDate: string }

export default function VisaApplicationForm({ serviceId }: { serviceId: string }) {
  const [values, setValues] = useState<FormValues>({ fullName: '', email: '', passportNumber: '', intendedEntryDate: '' })
  const [files, setFiles] = useState<Partial<Record<DocumentField, File>>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setValue = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }))

  const chooseFile = (field: DocumentField, file: File | undefined) => {
    if (!file) return
    const maxSize = field === 'photograph' ? 2 * 1024 * 1024 : 5 * 1024 * 1024
    const allowedTypes = field === 'photograph' ? photoTypes : passportTypes
    if (!allowedTypes.includes(file.type)) {
      setErrors((current) => ({ ...current, [field]: 'Use a PDF, JPG, or PNG file.' }))
      return
    }
    if (file.size > maxSize) {
      setErrors((current) => ({ ...current, [field]: `File must be smaller than ${field === 'photograph' ? '2MB' : '5MB'}.` }))
      return
    }
    setErrors((current) => ({ ...current, [field]: '' }))
    setFiles((current) => ({ ...current, [field]: file }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.passportNumber.trim()) nextErrors.passportNumber = 'Passport number is required.'
    if (!values.intendedEntryDate) nextErrors.intendedEntryDate = 'Entry date is required.'
    for (const field of ['passportFront', 'passportBack', 'photograph'] as DocumentField[]) {
      if (!files[field]) nextErrors[field] = 'This document is required.'
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setSubmitting(true)
    setStatus('')
    try {
      const result = await submitVisaApplication({
        serviceId,
        personalDetails: { fullName: values.fullName.trim(), email: values.email.trim() },
        passportDetails: { passportNumber: values.passportNumber.trim() },
        travelDetails: { intendedEntryDate: values.intendedEntryDate },
        passportFront: files.passportFront!,
        passportBack: files.passportBack!,
        photograph: files.photograph!,
      })
      setStatus(`Application ${result.applicationId} submitted with status: ${result.status}.`)
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to submit the application.' })
    } finally {
      setSubmitting(false)
    }
  }

  return <Card className="mt-8 p-6 sm:p-8"><h2 className="text-h3">Visa Application</h2><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Provide your details and upload clear documents to continue.</p>{errors.form && <Alert variant="error" title="Submission failed" className="mt-5">{errors.form}</Alert>}{status && <Alert variant="success" title="Application submitted" className="mt-5">{status}</Alert>}<form onSubmit={submit} className="mt-6 space-y-5" noValidate><div className="grid gap-4 sm:grid-cols-2"><Input label="Full name" value={values.fullName} onChange={(event) => setValue('fullName', event.target.value)} error={errors.fullName} required /><Input label="Email" type="email" value={values.email} onChange={(event) => setValue('email', event.target.value)} error={errors.email} required /><Input label="Passport number" value={values.passportNumber} onChange={(event) => setValue('passportNumber', event.target.value)} error={errors.passportNumber} required /><Input label="Intended entry date" type="date" value={values.intendedEntryDate} onChange={(event) => setValue('intendedEntryDate', event.target.value)} error={errors.intendedEntryDate} required /></div><div className="grid gap-4 sm:grid-cols-3"><DocumentInput label="Passport front" field="passportFront" accept=".pdf,.jpg,.jpeg,.png" error={errors.passportFront} onChange={chooseFile} /><DocumentInput label="Passport back" field="passportBack" accept=".pdf,.jpg,.jpeg,.png" error={errors.passportBack} onChange={chooseFile} /><DocumentInput label="Applicant photograph" field="photograph" accept=".jpg,.jpeg,.png" error={errors.photograph} onChange={chooseFile} /></div><Button type="submit" loading={submitting}>Submit application</Button></form></Card>
}
function DocumentInput({ label, field, accept, error, onChange }: { label: string; field: DocumentField; accept: string; error?: string; onChange: (field: DocumentField, file?: File) => void }) {
  return <label className="block text-sm font-medium">{label}<input className="mt-2 block w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-2 text-sm" type="file" accept={accept} onChange={(event) => onChange(field, event.target.files?.[0])} />{error && <span className="mt-1 block text-xs text-[var(--color-error)]">{error}</span>}<span className="mt-1 block text-xs text-[var(--color-text-muted)]">{field === 'photograph' ? 'JPG/PNG, max 2MB' : 'PDF/JPG/PNG, max 5MB'}</span></label>
}
