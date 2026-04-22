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
      className="bg-white rounded-lg shadow-sm border border-[#EBEBEB] border-l-[3px] p-4 cursor-pointer active:scale-[0.98] hover:border-[#03C75A]/30 transition-all"
      style={{ borderLeftColor: category?.color ?? '#03C75A' }}
      onClick={() => setSelectedItem(item)}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1">
          <span
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
            style={{ backgroundColor: (category?.color ?? '#03C75A') + '15', color: category?.color ?? '#03C75A' }}
          >
            {category?.icon} {item.category}
          </span>
          {rank && rank <= 3 && (
            <span className="text-base leading-none">{RANK_BADGE[rank]}</span>
          )}
          {item.isFeatured && !rank && (
            <span className="text-[10px] bg-[#03C75A] text-white px-2 py-0.5 rounded-sm font-bold tracking-wide">
              인기
            </span>
          )}
          {item.isUserAdded && (
            <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-medium">
              내 질문
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id) }}
          className={clsx('text-lg transition-transform active:scale-125', isFav ? 'text-yellow-400' : 'text-[#CCCCCC]')}
          aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFav ? '★' : '☆'}
        </button>
      </div>

      <h3 className="text-[15px] font-semibold text-[#222222] leading-snug mb-1">
        {highlight(item.question, searchQuery)}
      </h3>

      {!compact && (
        <p className="text-xs text-[#777777] leading-relaxed line-clamp-2">
          {highlight(item.answer, searchQuery)}
        </p>
      )}

      <div className="flex items-center gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => incrementLike(item.id)}
          className="flex items-center gap-1 text-xs text-[#777777] active:text-[#03C75A] transition-colors"
        >
          <span>👍</span>
          <span>{totalLikes}</span>
        </button>
        <span className="text-xs text-[#999999]">{item.relatedLinks.length}개 링크</span>
      </div>
    </article>
  )
}
