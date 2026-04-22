import { useQAStore } from '@/stores/qaStore'
import { QACard } from '@/components/qa/QACard'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { CATEGORIES } from '@/constants/categories'
import { getFeaturedItems } from '@/utils/search'
import { useRef, useMemo } from 'react'

function getTodayTip() {
  const dayIndex = new Date().getDate() % KNOWLEDGE_BASE.length
  return KNOWLEDGE_BASE[dayIndex]
}

const ALL_TAGS = Array.from(
  new Set(KNOWLEDGE_BASE.flatMap((item) => item.tags))
).sort()

export function SearchPage() {
  const { searchQuery, searchResults, search, clearSearch, setActiveTab, setSelectedItem, recentSearches, clearRecentSearches, userQuestions } =
    useQAStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const featured = getFeaturedItems(KNOWLEDGE_BASE)
  const todayTip = useMemo(() => getTodayTip(), [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    if (q.trim()) {
      search(q)
    } else {
      clearSearch()
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const item = KNOWLEDGE_BASE.find((i) => i.category === categoryId)
    if (item) {
      setActiveTab('browse')
    }
  }

  return (
    <div>
      {/* 검색 바 */}
      <div className="px-4 pb-4">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="도배, 샤시, 화장실 비용... 뭐든 물어보세요"
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F7F7] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#03C75A]/30 focus:border-[#03C75A] focus:bg-white transition-all placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => {
                clearSearch()
                inputRef.current?.focus()
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 태그 자동완성 */}
      {searchQuery && searchQuery.length >= 1 && searchResults.length === 0 && (() => {
        const suggestions = ALL_TAGS.filter((t) => t.includes(searchQuery)).slice(0, 5)
        return suggestions.length > 0 ? (
          <div className="px-4 mb-3 flex flex-wrap gap-2">
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => search(tag)}
                className="text-xs bg-[#E5F9EE] text-[#02A549] px-3 py-1.5 rounded-full border border-[#EBEBEB]"
              >
                #{tag}
              </button>
            ))}
          </div>
        ) : null
      })()}

      {/* 검색 결과 */}
      {searchQuery && (
        <div className="px-4">
          {searchResults.length > 0 ? (
            <>
              <p className="text-xs text-gray-400 mb-3">
                "{searchQuery}" 검색 결과 {searchResults.length}개
              </p>
              <div className="flex flex-col gap-3">
                {searchResults.map((item) => (
                  <QACard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mb-3 mx-auto">🤔</div>
              <p className="text-sm text-[#222222] font-semibold mb-1">"{searchQuery}"에 대한 정보가 없어요</p>
              <p className="text-xs text-[#777777]">
                질문 추가 탭에서 직접 추가해보세요!
              </p>
              <button
                onClick={() => setActiveTab('add')}
                className="mt-4 px-5 py-2 bg-[#03C75A] text-white text-sm rounded-full"
              >
                질문 추가하기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 기본 화면 (검색어 없을 때) */}
      {!searchQuery && (
        <div className="px-4">
          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-[#222222] pl-2.5 border-l-[3px] border-[#03C75A]">최근 검색어</h2>
                <button onClick={clearRecentSearches} className="text-xs text-gray-400">
                  전체 삭제
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((q) => (
                  <button
                    key={q}
                    onClick={() => search(q)}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full active:bg-[#E5F9EE] active:text-[#02A549] transition-colors"
                  >
                    🕐 {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 오늘의 팁 */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-[#222222] pl-2.5 border-l-[3px] border-[#03C75A] mb-2">오늘의 팁</h2>
            <button
              onClick={() => setSelectedItem(todayTip)}
              className="w-full bg-gradient-to-r from-[#E5F9EE] to-[#F0FFF8] border border-[#EBEBEB] rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
            >
              <div className="text-xs text-[#03C75A] font-medium mb-1">💡 {todayTip.category}</div>
              <div className="text-sm font-semibold text-gray-800 mb-1">{todayTip.question}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{todayTip.answer}</div>
            </button>
          </div>

          {/* 카테고리 빠른 접근 */}
          <h2 className="text-sm font-semibold text-[#222222] pl-2.5 border-l-[3px] border-[#03C75A] mb-3">카테고리별 보기</h2>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-1 active:opacity-70 transition-opacity"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: cat.color + '15' }}
                >
                  {cat.icon}
                </div>
                <span className="text-xs text-gray-500 text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* 인기 질문 */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#222222] pl-2.5 border-l-[3px] border-[#03C75A]">자주 묻는 질문 · 총 {KNOWLEDGE_BASE.length + userQuestions.length}개</h2>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs text-[#03C75A]"
            >
              전체보기
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {featured.slice(0, 6).map((item, i) => (
              <QACard key={item.id} item={item} rank={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
