'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { blogPosts } from '@/data/blogPosts'

export default function BlogPage() {
  return (
    <div className="section-gap bg-[var(--color-surface-secondary)]">
      <Container>
        <SectionHeading title="Travel Journal" description="Read practical guides and inspiration for your next journey." />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => <Card key={post.id} className="overflow-hidden bg-white" hover padding="none"><div className={`h-52 ${post.imageFallbackColor}`}>{post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}</div><div className="p-6"><div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider"><span className="text-[var(--color-primary)]">{post.category}</span><span className="text-[var(--color-text-secondary)]">{post.date}</span></div><h2 className="mt-3 text-xl font-bold text-[var(--color-text-primary)]">{post.title}</h2><p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{post.excerpt}</p><Button className="mt-5 px-0" variant="ghost" asChild><Link href={`/blog/${post.id}`}>Read article <BookOpen size={15} /></Link></Button></div></Card>)}
        </div>
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">Articles shown are mock content for frontend development.</p>
      </Container>
    </div>
  )
}
