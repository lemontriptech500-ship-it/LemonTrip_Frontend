import Link from 'next/link'
import { ArrowLeft, Tag } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { featuredOffers } from '@/data/offers'

export default async function OfferDetailsPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params
  const offer = featuredOffers.find((item) => item.id === offerId)
  if (!offer) return <div className="section-gap"><Container><Card><h1 className="text-h2">Offer not found</h1><Button className="mt-6" asChild><Link href="/offers">Back to offers</Link></Button></Card></Container></div>
  return <div className="section-gap"><Container className="max-w-3xl"><Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/offers">Back to offers</Link></Button><Card className="mt-6 overflow-hidden" padding="none"><div className={`relative h-64 ${offer.imageColor}`}>{offer.imageUrl && <img src={offer.imageUrl} alt="" className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.60)] to-transparent" /><div className="absolute bottom-5 left-6 flex items-center gap-2 font-semibold text-[var(--color-text-primary)]"><Tag size={18} />{offer.category}</div></div><div className="p-6 sm:p-8"><h1 className="text-h1">{offer.title}</h1><p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">{offer.description}</p>{offer.code && <div className="mt-8 rounded border border-dashed border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 text-center"><p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">Demo promo code</p><p className="mt-1 font-mono text-xl font-bold">{offer.code}</p></div>}<p className="mt-8 text-sm text-[var(--color-text-secondary)]">This promotion is mock content for interface preview.</p></div></Card></Container></div>
}
