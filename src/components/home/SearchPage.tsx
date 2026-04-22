import { useQAStore } from '@/stores/qaStore'
import { QACard } from '@/components/qa/QACard'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import { CATEGORIES } from '@/constants/categories'
import { getFeaturedItems } from '@/utils/search'
import { useRef, useMemo } from 'react'
import * as Icons from 'lucide-react'
import { Search, X, ChevronRight, type LucideIcon } from 'lucide-react'

function getTodayTip() {
  const dayIndex = new Date().getDate() % KNOWLEDGE_BASE.length
  return KNOWLEDGE_BASE[dayIndex]
}

export function SearchPage() {
  const {
    searchQuery,
    searchResults,
    search,
    clearSearch,
    setActiveTab,
    setSelectedItem,
    recentSearches,
    clearRecentSearches,
    userQuestions,
  } = useQAStore()
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

  return (
    <div>
      {/* 검색창 */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B95A1]"
            strokeWidth={2.5}
          />
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="집수리 비용, 방법 검색해보세요"
            className="w-full pl-12 pr-4 py-3.5 bg-[#F2F4F6] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-[#00A35C]/40 transition-all placeholder-[#8B95A1]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                clearSearch()
                inputRef.current?.focus()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-[#8B95A1]" />
            </button>
          )}
        </div>
      </div>

      {/* 검색 결과 */}
      {searchQuery && (
        <div className="px-5">
          {searchResults.length > 0 ? (
            <>
              <p className="text-[12px] text-[#8B95A1] mb-3">
                "{searchQuery}" 검색 결과 {searchResults.length}개
              </p>
              <div className="flex flex-col gap-3">
                {searchResults.map((item) => (
                  <QACard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F2F4F6] flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-[#8B95A1]" strokeWidth={2} />
              </div>
              <p className="text-[15px] text-[#191F28] font-semibold mb-1">검색 결과가 없어요</p>
              <p className="text-[13px] text-[#8B95A1] mb-5">다른 키워드로 검색해보세요</p>
              <button
                onClick={() => setActiveTab('add')}
                className="px-5 py-2.5 bg-[#00A35C] text-white text-[13px] font-semibold rounded-full"
              >
                질문 직접 추가하기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 기본 화면 (검색어 없을 때) */}
      {!searchQuery && (
        <div>
          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <section className="px-5 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-semibold text-[#191F28]">최근 검색어</h2>
                <button onClick={clearRecentSearches} className="text-[12px] text-[#8B95A1]">
                  전체 삭제
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((q) => (
                  <button
                    key={q}
                    onClick={() => search(q)}
                    className="text-[13px] bg-[#F2F4F6] text-[#4E5968] px-3.5 py-2 rounded-full font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 카테고리 */}
          <section className="px-5 mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-semibold text-[#191F28]">카테고리</h2>
              <button
                onClick={() => setActiveTab('browse')}
                className="flex items-center gap-0.5 text-[13px] text-[#4E5968] font-medium"
              >
                전체 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.slice(0, 5).map((cat) => {
                const Icon = Icons[cat.iconName as keyof typeof Icons] as LucideIcon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab('browse')}
                    className="flex flex-col items-center gap-1.5 py-2 active:opacity-60 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F2F4F6] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#333D4B]" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] text-[#4E5968] font-medium">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* 오늘의 팁 */}
          <section className="px-5 mb-10">
            <h2 className="text-[16px] font-semibold text-[#191F28] mb-3">오늘의 팁</h2>
            <button
              onClick={() => setSelectedItem(todayTip)}
              className="w-full bg-white border border-[#E5E8EB] rounded-xl p-4 text-left active:bg-[#F7F8FA] transition-colors"
            >
              <div className="text-[11px] font-bold text-[#00A35C] uppercase tracking-wider mb-1.5">
                {todayTip.category}
              </div>
              <div className="text-[15px] font-semibold text-[#191F28] mb-1.5 leading-snug">
                {todayTip.question}
              </div>
              <p className="text-[13px] text-[#4E5968] line-clamp-2 leading-relaxed">
                {todayTip.answer}
              </p>
            </button>
          </section>

          {/* 자주 묻는 질문 */}
          <section className="px-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[16px] font-semibold text-[#191F28]">자주 묻는 질문</h2>
                <p className="text-[12px] text-[#8B95A1] mt-0.5">
                  총 {KNOWLEDGE_BASE.length + userQuestions.length}개
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {featured.slice(0, 6).map((item, i) => (
                <QACard key={item.id} item={item} rank={i + 1} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
