import { useRef } from 'react'
import { useQAStore } from '@/stores/qaStore'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { QACard } from '@/components/qa/QACard'
import { exportData, parseImportData } from '@/utils/exportImport'

export function FavoritesPage() {
  const { favorites, userQuestions, likesMap, importData, setActiveTab } = useQAStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const allItems = [...KNOWLEDGE_BASE, ...userQuestions]
  const favItems = allItems.filter((item) => favorites.includes(item.id))

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const data = parseImportData(ev.target?.result as string)
      if (!data) { alert('올바른 파일 형식이 아닙니다.'); return }
      if (confirm(`내 질문 ${data.userQuestions.length}개, 즐겨찾기 ${data.favorites.length}개를 불러올까요?`)) {
        importData(data.userQuestions, data.favorites, data.likesMap)
        alert('가져오기 완료!')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const dataControls = (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <p className="text-xs text-[#777777] font-medium mb-2 text-center">데이터 관리</p>
      <div className="flex gap-2">
        <button
          onClick={() => exportData(userQuestions, favorites, likesMap)}
          className="flex-1 py-2.5 text-xs bg-white text-[#555555] rounded-lg border border-[#EBEBEB] active:bg-[#F5F5F5]"
        >
          📤 내보내기
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-2.5 text-xs bg-white text-[#555555] rounded-lg border border-[#EBEBEB] active:bg-[#F5F5F5]"
        >
          📥 가져오기
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
      </div>
    </div>
  )

  return (
    <div className="px-4">
      {userQuestions.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-blue-600 mb-2">내가 추가한 질문 {userQuestions.length}개</h3>
          <div className="flex flex-col gap-2">
            {userQuestions.map((item) => (
              <QACard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      )}
      {favItems.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-3">즐겨찾기 {favItems.length}개</p>
          <div className="flex flex-col gap-3">
            {favItems.map((item) => (
              <QACard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
      {userQuestions.length === 0 && favItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-[#E5F9EE] flex items-center justify-center text-4xl mb-4">
            ⭐
          </div>
          <h3 className="text-base font-bold text-[#222222] mb-2">저장한 질문이 없어요</h3>
          <p className="text-sm text-[#777777] leading-relaxed mb-4">
            자주 참고하고 싶은 답변의
            <br />
            ★ 버튼을 눌러 저장해보세요
          </p>
          <button
            onClick={() => setActiveTab('search')}
            className="px-6 py-2.5 bg-[#03C75A] text-white text-sm font-semibold rounded-full"
          >
            인기 질문 보러가기
          </button>
        </div>
      )}
      {dataControls}
    </div>
  )
}
