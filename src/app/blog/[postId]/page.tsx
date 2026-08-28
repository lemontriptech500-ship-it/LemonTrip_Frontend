import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { blogPosts } from '@/data/blogPosts'

export default async function BlogDetailsPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const post = blogPosts.find((item) => item.id === postId)
  if (!post) return <div className="section-gap"><Container><Card><h1 className="text-h2">Article not found</h1><Button className="mt-6" asChild><Link href="/blog">Back to travel journal</Link></Button></Card></Container></div>
  return <div className="section-gap bg-[var(--color-surface-secondary)]"><Container className="max-w-4xl"><Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/blog">Back to travel journal</Link></Button><Card className="mt-6 overflow-hidden bg-white" padding="none"><div className={`h-72 ${post.imageFallbackColor}`}>{post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />}</div><article className="p-6 sm:p-10"><div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]"><BookOpen size={16} />{post.category}<span className="text-[var(--color-text-secondary)]">{post.date}</span></div><h1 className="mt-4 text-h1">{post.title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">{post.excerpt}</p><div className="mt-8 border-t border-[var(--color-border-light)] pt-6 text-sm text-[var(--color-text-secondary)]">Full article content is represented by this mock detail view for frontend review.</div></article></Card></Container></div>
}
