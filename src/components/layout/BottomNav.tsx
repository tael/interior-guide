import { useQAStore } from '@/stores/qaStore'
import type { TabId } from '@/types/qa'
import clsx from 'clsx'

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'search', label: '검색', icon: '🔍' },
  { id: 'browse', label: '둘러보기', icon: '📂' },
  { id: 'add', label: '질문추가', icon: '✏️' },
  { id: 'favorites', label: '즐겨찾기', icon: '⭐' },
]

export function BottomNav() {
  const { activeTab, setActiveTab, favorites, userQuestions } = useQAStore()
  const badges: Partial<Record<TabId, number>> = {
    favorites: favorites.length || undefined,
    add: userQuestions.length || undefined,
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#EBEBEB] shadow-none z-50">
      <div className="flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'relative flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-xs transition-colors',
              activeTab === tab.id
                ? 'text-[#03C75A] font-bold'
                : 'text-[#999999]',
            )}
          >
            {activeTab === tab.id && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#03C75A] rounded-b-full"/>
            )}
            <span className="relative text-xl leading-none">
              {tab.icon}
              {badges[tab.id] != null && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-[#03C75A] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {badges[tab.id]}
                </span>
              )}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </nav>
  )
}
