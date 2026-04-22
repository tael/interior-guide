import { Plus } from 'lucide-react'
import { useQAStore } from '@/stores/qaStore'

export function AddFab() {
  const { activeTab, setActiveTab, selectedItem } = useQAStore()
  if (activeTab === 'add' || selectedItem) return null
  return (
    <button
      onClick={() => setActiveTab('add')}
      className="fixed bottom-24 right-4 w-14 h-14 bg-[#00A35C] text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-95 transition-transform"
      aria-label="내 정보 추가"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </button>
  )
}
