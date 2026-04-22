import { useState } from 'react'
import { CATEGORIES } from '@/constants/categories'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { useQAStore } from '@/stores/qaStore'
import { QACard } from '@/components/qa/QACard'
import { CostCalc } from '@/components/browse/CostCalc'
import { FutureRoadmap } from '@/components/common/FutureRoadmap'
import { getItemsByCategory } from '@/utils/search'

export function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'likes' | 'default'>('likes')
  const { userQuestions } = useQAStore()

  const allItems = [...KNOWLEDGE_BASE, ...userQuestions]

  if (selectedCategory) {
    const rawItems = getItemsByCategory(allItems, selectedCategory)
    const items = sortBy === 'likes'
      ? [...rawItems].sort((a, b) => b.likes - a.likes)
      : rawItems
    const cat = CATEGORIES.find((c) => c.id === selectedCategory)

    return (
      <div className="px-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-1.5 text-sm text-[#555555] mb-4 active:opacity-70"
        >
          ← 카테고리 목록
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cat?.icon}</span>
            <div>
              <h2 className="text-base font-bold text-gray-800">{cat?.name}</h2>
              <p className="text-xs text-gray-400">{cat?.description}</p>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'likes' | 'default')}
            className="text-xs bg-white border border-[#EBEBEB] rounded-lg px-2 py-1.5 text-[#555555] outline-none focus:border-[#03C75A]"
          >
            <option value="likes">인기순</option>
            <option value="default">기본순</option>
          </select>
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <QACard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            아직 등록된 정보가 없어요
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="px-4">
      <CostCalc />
      <div className="flex flex-col gap-2" role="list" aria-label="카테고리 목록">
        {CATEGORIES.map((cat) => {
          const count = getItemsByCategory(allItems, cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform text-left"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: cat.color + '20' }}
              >
                {cat.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#222222]">{cat.name}</div>
                <div className="text-xs text-[#777777]">{cat.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-[#555555]">
                  {count}개
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <FutureRoadmap />
    </div>
  )
}
