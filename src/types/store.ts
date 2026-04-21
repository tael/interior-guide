import type { QAItem, TabId } from './qa'

export interface QAStore {
  activeTab: TabId
  searchQuery: string
  searchResults: QAItem[]
  favorites: string[]
  userQuestions: QAItem[]
  selectedItem: QAItem | null
  recentSearches: string[]
  setActiveTab: (tab: TabId) => void
  setSearchQuery: (query: string) => void
  search: (query: string) => void
  clearSearch: () => void
  clearRecentSearches: () => void
  toggleFavorite: (id: string) => void
  addUserQuestion: (item: Omit<QAItem, 'id' | 'likes' | 'isUserAdded' | 'createdAt'>) => void
  deleteUserQuestion: (id: string) => void
  setSelectedItem: (item: QAItem | null) => void
  likesMap: Record<string, number>
  incrementLike: (id: string) => void
}
