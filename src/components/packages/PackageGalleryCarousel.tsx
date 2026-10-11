'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff, MapPin } from 'lucide-react'

export function PackageGalleryCarousel({ images, title, duration, category, location }: { images: string[]; title: string; duration: string; category: string; location?: string }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<number[]>([])
  const current = images[active]
  const previous = () => setActive((index) => (index - 1 + images.length) % images.length)
  const next = () => setActive((index) => (index + 1) % images.length)

  return (
    <section aria-label={`${title} photo gallery`} className="overflow-hidden rounded-[28px] border border-white bg-white shadow-[var(--shadow-xl)]">
      <div className="relative h-[350px] bg-[var(--green-dark)] sm:h-[470px] lg:h-[510px]">
        {current && !failed.includes(active) ? (
          // Remote catalog and stock images are not limited to configured Next image hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={current} src={current} alt={`${title} holiday photo ${active + 1}`} className="absolute inset-0 h-full w-full object-cover" onError={() => setFailed((indexes) => [...indexes, active])} />
        ) : <div className="absolute inset-0 grid place-items-center text-[var(--color-text-secondary)]"><ImageOff size={36} /><span className="sr-only">Image unavailable</span></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#031f18]/90 via-[#031f18]/15 to-black/10" />
        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#063b24]/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">{active + 1} <span className="px-1 text-white/60">/</span> {images.length}</div>
        <button type="button" aria-label="Previous package photo" onClick={previous} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[var(--green-dark)] shadow-md transition hover:scale-105 hover:bg-white sm:left-5"><ChevronLeft size={20} /></button>
        <button type="button" aria-label="Next package photo" onClick={next} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[var(--green-dark)] shadow-md transition hover:scale-105 hover:bg-white sm:right-5"><ChevronRight size={20} /></button>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-9">
          <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-[var(--yellow)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--green-dark)]">{category}</span><span className="rounded-full border border-white/35 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">{duration}</span></div>
          <h1 className="max-w-4xl font-heading text-4xl font-semibold leading-[0.98] tracking-tight text-white drop-shadow sm:text-6xl lg:text-7xl">{title}</h1>
          {location && <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90"><MapPin size={15} className="text-[var(--yellow)]" />{location}</p>}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto bg-white p-3 sm:gap-3 sm:p-4" aria-label="Choose a package photo">
        {images.map((src, index) => <button key={`${src}-${index}`} type="button" aria-label={`Show package photo ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)} className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-32 ${active === index ? 'border-[var(--green-2)] shadow-sm' : 'border-transparent opacity-65 hover:opacity-100'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </button>)}
      </div>
    </section>
  )
}
