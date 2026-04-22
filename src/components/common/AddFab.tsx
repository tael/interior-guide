import { useQAStore } from '@/stores/qaStore'

export function AddFab() {
  const { activeTab, setActiveTab } = useQAStore()
  if (activeTab === 'add') return null
  return (
    <button
      onClick={() => setActiveTab('add')}
      className="fixed bottom-24 right-4 w-14 h-14 bg-[#03C75A] text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-40 active:scale-95 transition-transform"
      aria-label="내 정보 추가"
    >
      ✏️
    </button>
  )
}
