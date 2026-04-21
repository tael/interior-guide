import { create } from 'zustand'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { loadJSON, saveJSON } from '@/utils/storage'
import { searchItems } from '@/utils/search'
import type { QAItem } from '@/types/qa'
import type { QAStore } from '@/types/store'

const ALL_ITEMS = (): QAItem[] => {
  const userQs = loadJSON<QAItem[]>('userQuestions', [])
  return [...KNOWLEDGE_BASE, ...userQs]
}

export const useQAStore = create<QAStore>((set, get) => ({
  activeTab: 'search',
  searchQuery: '',
  searchResults: [],
  favorites: loadJSON<string[]>('favorites', []),
  userQuestions: loadJSON<QAItem[]>('userQuestions', []),
  selectedItem: null,
  likesMap: loadJSON<Record<string, number>>('likes', {}),

  setActiveTab: (tab) => set({ activeTab: tab, selectedItem: null }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  search: (query) => {
    const results = searchItems(ALL_ITEMS(), query)
    set({ searchQuery: query, searchResults: results })
  },

  clearSearch: () => set({ searchQuery: '', searchResults: [] }),

  toggleFavorite: (id) => {
    const { favorites } = get()
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]
    saveJSON('favorites', next)
    set({ favorites: next })
  },

  addUserQuestion: (item) => {
    const { userQuestions } = get()
    const newItem: QAItem = {
      ...item,
      id: `user-${Date.now()}`,
      likes: 0,
      isUserAdded: true,
      createdAt: new Date().toISOString(),
    }
    const next = [newItem, ...userQuestions]
    saveJSON('userQuestions', next)
    set({ userQuestions: next })
  },

  deleteUserQuestion: (id) => {
    const { userQuestions, favorites } = get()
    const next = userQuestions.filter((q) => q.id !== id)
    const nextFavs = favorites.filter((f) => f !== id)
    saveJSON('userQuestions', next)
    saveJSON('favorites', nextFavs)
    set({ userQuestions: next, favorites: nextFavs })
  },

  setSelectedItem: (item) => set({ selectedItem: item }),

  incrementLike: (id) => {
    const { likesMap } = get()
    const next = { ...likesMap, [id]: (likesMap[id] ?? 0) + 1 }
    saveJSON('likes', next)
    set({ likesMap: next })
  },
}))
