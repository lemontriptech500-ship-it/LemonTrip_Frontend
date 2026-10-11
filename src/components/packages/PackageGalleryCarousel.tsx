'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'

export function PackageGalleryCarousel({ images, title, duration, category }: { images: string[]; title: string; duration: string; category: string }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<number[]>([])
  const current = images[active]
  const previous = () => setActive((index) => (index - 1 + images.length) % images.length)
  const next = () => setActive((index) => (index + 1) % images.length)

  return (
    <section aria-label={`${title} photo gallery`} className="overflow-hidden rounded-3xl">
      <div className="relative h-[340px] bg-[var(--color-secondary-soft)] sm:h-[440px]">
        {current && !failed.includes(active) ? (
          // Remote catalog and stock images are not limited to configured Next image hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={current} src={current} alt={`${title} holiday photo ${active + 1}`} className="absolute inset-0 h-full w-full object-cover" onError={() => setFailed((indexes) => [...indexes, active])} />
        ) : <div className="absolute inset-0 grid place-items-center text-[var(--color-text-secondary)]"><ImageOff size={36} /><span className="sr-only">Image unavailable</span></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
        <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">{active + 1} / {images.length}</div>
        <button type="button" aria-label="Previous package photo" onClick={previous} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"><ChevronLeft size={20} /></button>
        <button type="button" aria-label="Next package photo" onClick={next} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"><ChevronRight size={20} /></button>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900">{category}</span><span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900">{duration}</span></div>
          <h1 className="max-w-3xl text-3xl font-bold sm:text-5xl">{title}</h1>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto bg-[var(--color-surface)] p-3" aria-label="Choose a package photo">
        {images.map((src, index) => <button key={`${src}-${index}`} type="button" aria-label={`Show package photo ${index + 1}`} aria-current={active === index} onClick={() => setActive(index)} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-32 ${active === index ? 'border-[var(--color-primary)]' : 'border-transparent opacity-75 hover:opacity-100'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </button>)}
      </div>
    </section>
  )
}
