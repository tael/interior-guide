import { ChevronLeft } from 'lucide-react'
import { useQAStore } from '@/stores/qaStore'

const TAB_TITLES: Record<string, string> = {
  search: '집수리 가이드',
  browse: '카테고리',
  favorites: '즐겨찾기',
}

export function Header() {
  const { activeTab, selectedItem, setSelectedItem } = useQAStore()

  if (selectedItem) {
    return (
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white z-40">
        <div className="flex items-center h-14 px-4 gap-3">
          <button
            onClick={() => setSelectedItem(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#191F28]"
            aria-label="뒤로가기"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <h1 className="text-[17px] font-bold tracking-tight text-[#191F28] truncate flex-1">상세 보기</h1>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white z-40">
      <div className="flex items-center h-14 px-4">
        <h1 className="text-[17px] font-bold tracking-tight text-[#191F28]">{TAB_TITLES[activeTab]}</h1>
      </div>
    </header>
  )
}
