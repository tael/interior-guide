export interface RelatedLink {
  title: string
  url: string
  type: 'youtube' | 'blog' | 'site'
}

export interface QAItem {
  id: string
  category: string
  question: string
  answer: string
  tags: string[]
  relatedLinks: RelatedLink[]
  likes: number
  isUserAdded?: boolean
  createdAt?: string
  isFeatured?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export type TabId = 'search' | 'browse' | 'add' | 'favorites'
