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
  const { activeTab, setActiveTab } = useQAStore()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors',
              activeTab === tab.id
                ? 'text-orange-500 font-semibold'
                : 'text-gray-400',
            )}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </nav>
  )
}
