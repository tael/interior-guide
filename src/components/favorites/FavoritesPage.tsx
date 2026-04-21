import { useQAStore } from '@/stores/qaStore'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { QACard } from '@/components/qa/QACard'

export function FavoritesPage() {
  const { favorites, userQuestions } = useQAStore()
  const allItems = [...KNOWLEDGE_BASE, ...userQuestions]
  const favItems = allItems.filter((item) => favorites.includes(item.id))

  if (favItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <div className="text-5xl mb-4">⭐</div>
        <h3 className="text-base font-semibold text-gray-700 mb-2">저장한 질문이 없어요</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          자주 참고하고 싶은 답변의
          <br />
          ★ 버튼을 눌러 저장해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="px-4">
      <p className="text-xs text-gray-400 mb-3">{favItems.length}개 저장됨</p>
      <div className="flex flex-col gap-3">
        {favItems.map((item) => (
          <QACard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
