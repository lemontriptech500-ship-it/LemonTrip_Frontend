'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'

export interface BlogGalleryImage {
  src: string
  alt: string
  caption: string
}

export function BlogImageCarousel({ images }: { images: BlogGalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  if (!activeImage) return null

  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length)
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length)

  return (
    <section aria-label="Article photo gallery" className="mt-9 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
          <Images size={17} className="text-[var(--green-2)]" />
          <span>On the way</span>
        </div>
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">{activeIndex + 1} / {images.length}</span>
      </div>

      <div className="group relative aspect-[16/8] min-h-52 overflow-hidden bg-[var(--color-surface-secondary)] sm:min-h-72">
        <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-14 sm:px-7">
          <p className="max-w-xl text-sm font-medium text-white drop-shadow sm:text-base">{activeImage.caption}</p>
        </div>
        {images.length > 1 && <>
          <button type="button" onClick={showPrevious} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[var(--green-dark)] shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ChevronLeft size={21} />
          </button>
          <button type="button" onClick={showNext} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[var(--green-dark)] shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ChevronRight size={21} />
          </button>
        </>}
      </div>

      {images.length > 1 && <div className="flex gap-2 overflow-x-auto p-3 sm:gap-3 sm:p-4" role="group" aria-label="Choose a photo">
        {images.map((image, index) => <button key={`${image.src}-${index}`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show photo ${index + 1}: ${image.caption}`} aria-pressed={activeIndex === index} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-[4.5rem] sm:w-32 ${activeIndex === index ? 'border-[var(--green-2)] ring-2 ring-[var(--green-2)]/20' : 'border-transparent opacity-70 hover:opacity-100'}`}>
          <img src={image.src} alt="" className="h-full w-full object-cover" />
        </button>)}
      </div>}
    </section>
  )
}
