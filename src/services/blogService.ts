import { blogPosts } from '@/data/blogPosts'

export async function getBlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return blogPosts
}

export async function getBlogPostById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return blogPosts.find((p) => p.id === id) || null
}

export async function getRelatedPosts(currentId: string, limit = 3) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return blogPosts.filter((p) => p.id !== currentId).slice(0, limit)
}
