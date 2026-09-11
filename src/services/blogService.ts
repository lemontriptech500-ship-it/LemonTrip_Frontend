import { apiRequest } from '@/lib/apiClient'
import type { BlogPost } from '@/data/blogPosts'

export async function getBlogPosts(): Promise<BlogPost[]> {
  const result = await apiRequest<{ posts: BlogPost[] }>('/blog')
  return result.posts
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    return await apiRequest<BlogPost>(`/blog/${encodeURIComponent(id)}`)
  } catch {
    return null
  }
}

export async function getRelatedPosts(currentId: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((p) => p.id !== currentId).slice(0, limit)
}
