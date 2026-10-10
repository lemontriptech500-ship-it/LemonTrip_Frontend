import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, FileText } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { mockVisaServices } from '@/data/visaServices'
import { CountryFlag } from '@/components/visa/CountryFlag'
import VisaApplicationForm from '@/components/visa/VisaApplicationForm'

export default async function VisaDetailsPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  const service = mockVisaServices.find((item) => item.id === serviceId)
  if (!service) return <div className="section-gap"><Container><Card><h1 className="text-h2">Visa service not found</h1><Button className="mt-6" asChild><Link href="/visa">Back to visa services</Link></Button></Card></Container></div>

  return <div className="section-gap bg-[var(--color-background)]"><Container className="max-w-4xl"><Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/visa">Back to visa services</Link></Button><Card className="mt-6 overflow-hidden" padding="none"><div className="relative flex h-56 items-center justify-center bg-[var(--color-surface-secondary)] sm:h-72"><CountryFlag country={service.country} className="h-full w-full rounded-none text-8xl sm:text-9xl" /><h1 className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-white/90 px-6 py-4 text-3xl font-bold text-[var(--green-dark)]"><FileText size={25} />{service.country}</h1></div><div className="p-6 sm:p-8"><p className="text-sm font-semibold text-[var(--color-accent)]">{service.visaType}</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-4"><p className="text-sm text-[var(--color-text-secondary)]">Typical processing time</p><p className="mt-1 flex items-center gap-2 font-semibold"><Clock size={16} />{service.processingTime}</p></div><div className="rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-4"><p className="text-sm text-[var(--color-text-secondary)]">Guidance package</p><p className="mt-1 font-semibold">{service.startingFrom}</p></div></div><h2 className="mt-8 text-xl font-bold text-[var(--color-text-primary)]">Required documents</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{service.documents?.map((document) => <p key={document} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><CheckCircle2 size={17} className="text-[var(--color-success)]" />{document}</p>)}</div></div></Card><VisaApplicationForm serviceId={service.id} /></Container></div>
}
