import { useQAStore } from '@/stores/qaStore'
import { useShallow } from 'zustand/react/shallow'
import type { QAItem } from '@/types/qa'
import clsx from 'clsx'
import { highlight } from '@/utils/highlight'
import { Bookmark, ThumbsUp, Link2 } from 'lucide-react'

interface Props {
  item: QAItem
  compact?: boolean
  rank?: number
}


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
  const totalLikes = item.likes + (likesMap[item.id] ?? 0)

  return (
    <article
      className="bg-white rounded-xl border border-[#E5E8EB] p-4 cursor-pointer active:bg-[#F7F8FA] transition-colors"
      onClick={() => setSelectedItem(item)}
    >
      {/* Top row: 카테고리 + 뱃지들 + 즐겨찾기 */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-[#4E5968] bg-[#F2F4F6] px-2 py-0.5 rounded font-medium">
            {item.category}
          </span>
          {rank && rank <= 3 && (
            <span className="text-[10px] bg-[#00A35C] text-white px-1.5 py-0.5 rounded font-bold tracking-wide">
              BEST {rank}
            </span>
          )}
          {item.isUserAdded && (
            <span className="text-[10px] bg-[#E6F5EC] text-[#00A35C] px-1.5 py-0.5 rounded font-semibold">내 질문</span>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id) }} aria-label="즐겨찾기">
          <Bookmark className={clsx("w-5 h-5", isFav ? "fill-[#00A35C] text-[#00A35C]" : "text-[#C9CDD2]")} strokeWidth={1.75}/>
        </button>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-[#191F28] leading-snug mb-1.5">
        {highlight(item.question, searchQuery)}
      </h3>

      {/* Body */}
      {!compact && (
        <p className="text-[13px] text-[#4E5968] leading-relaxed line-clamp-2 mb-3">
          {highlight(item.answer, searchQuery)}
        </p>
      )}

      {/* Bottom meta */}
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => incrementLike(item.id)} className="flex items-center gap-1 text-[12px] text-[#8B95A1] font-medium active:text-[#00A35C] transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" strokeWidth={2}/>
          <span>{totalLikes}</span>
        </button>
        {item.relatedLinks.length > 0 && (
          <span className="flex items-center gap-1 text-[12px] text-[#8B95A1] font-medium">
            <Link2 className="w-3.5 h-3.5" strokeWidth={2}/>
            <span>{item.relatedLinks.length}</span>
          </span>
        )}
      </div>
    </article>
  )
}
