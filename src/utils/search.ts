import type { QAItem } from '@/types/qa'

export function searchItems(items: QAItem[], query: string): QAItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return items
    .map((item) => {
      let score = 0
      if (item.question.toLowerCase().includes(q)) score += 3
      if (item.answer.toLowerCase().includes(q)) score += 2
      if (item.tags.some((t) => t.toLowerCase().includes(q))) score += 2
      if (item.category.toLowerCase().includes(q)) score += 1
      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
}

export function getItemsByCategory(items: QAItem[], categoryId: string): QAItem[] {
  return items.filter((item) => item.category === categoryId)
}

export function getFeaturedItems(items: QAItem[]): QAItem[] {
  return items.filter((item) => item.isFeatured).sort((a, b) => b.likes - a.likes)
}

export function getPopularItems(items: QAItem[], limit = 5): QAItem[] {
  return [...items].sort((a, b) => b.likes - a.likes).slice(0, limit)
}
