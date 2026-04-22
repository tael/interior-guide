import { useQAStore } from '@/stores/qaStore'
import { useShallow } from 'zustand/react/shallow'
import type { QAItem } from '@/types/qa'
import clsx from 'clsx'
import { CATEGORIES } from '@/constants/categories'
import { highlight } from '@/utils/highlight'

interface Props {
  item: QAItem
  compact?: boolean
  rank?: number
}

const RANK_BADGE: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export function QACard({ item, compact = false, rank }: Props) {
  const { favorites, toggleFavorite, setSelectedItem, likesMap, incrementLike, searchQuery } = useQAStore(
    useShallow((s) => ({
      favorites: s.favorites,
      toggleFavorite: s.toggleFavorite,
      setSelectedItem: s.setSelectedItem,
      likesMap: s.likesMap,
      incrementLike: s.incrementLike,
      searchQuery: s.searchQuery,
    })),
  )
  const isFav = favorites.includes(item.id)
  const category = CATEGORIES.find((c) => c.id === item.category)
  const totalLikes = item.likes + (likesMap[item.id] ?? 0)

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => setSelectedItem(item)}
    >
      <div className="flex items-start gap-2 mb-2">
        <span
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
          style={{ backgroundColor: category?.color + '20', color: category?.color }}
        >
          {category?.icon} {item.category}
        </span>
        {rank && rank <= 3 && (
          <span className="text-base leading-none">{RANK_BADGE[rank]}</span>
        )}
        {item.isFeatured && !rank && (
          <span className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full font-medium">
            인기
          </span>
        )}
        {item.isUserAdded && (
          <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-medium">
            내 질문
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">
        {highlight(item.question, searchQuery)}
      </h3>

      {!compact && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {highlight(item.answer, searchQuery)}
        </p>
      )}

      <div
        className="flex items-center justify-between mt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => incrementLike(item.id)}
            className="flex items-center gap-1 text-xs text-gray-400 active:text-orange-500 transition-colors"
          >
            <span>👍</span>
            <span>{totalLikes}</span>
          </button>
          <span className="text-xs text-gray-300">{item.relatedLinks.length}개 링크</span>
        </div>
        <button
          onClick={() => toggleFavorite(item.id)}
          className={clsx(
            'text-lg transition-transform active:scale-125',
            isFav ? 'text-yellow-400' : 'text-gray-200',
          )}
          aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          ★
        </button>
      </div>
    </article>
  )
}
