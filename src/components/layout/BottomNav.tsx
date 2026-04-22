import { Search, LayoutGrid, Bookmark } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useQAStore } from '@/stores/qaStore'
import type { TabId } from '@/types/qa'
import clsx from 'clsx'

const TABS: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: 'search', label: '검색', Icon: Search },
  { id: 'browse', label: '둘러보기', Icon: LayoutGrid },
  { id: 'favorites', label: '즐겨찾기', Icon: Bookmark },
]

export function BottomNav() {
  const { activeTab, setActiveTab, favorites } = useQAStore()
  const badges: Partial<Record<TabId, number>> = {
    favorites: favorites.length || undefined,
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#E5E8EB] z-50">
      <div className="flex">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={clsx(
                'relative flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors',
                isActive ? 'text-[#00A35C] font-semibold' : 'text-[#8B95A1]',
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {badges[id] != null && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-[#00A35C] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {badges[id]}
                  </span>
                )}
              </span>
              <span className="text-[11px]">{label}</span>
            </button>
          )
        })}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </nav>
  )
}
