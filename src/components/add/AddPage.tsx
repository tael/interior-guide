import { useState } from 'react'
import { useQAStore } from '@/stores/qaStore'
import { CATEGORIES } from '@/constants/categories'

export function AddPage() {
  const { addUserQuestion, setActiveTab } = useQAStore()
  const [form, setForm] = useState({
    category: '',
    question: '',
    answer: '',
    tags: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const isValid = form.category && form.question.trim().length >= 5 && form.answer.trim().length >= 10

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    addUserQuestion({
      category: form.category,
      question: form.question.trim(),
      answer: form.answer.trim(),
      tags: form.tags
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean),
      relatedLinks: [],
      isFeatured: false,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-base font-semibold text-gray-700 mb-2">질문이 추가됐어요!</h3>
        <p className="text-sm text-gray-400 mb-6">
          내가 추가한 질문은 이 기기의 로컬 저장소에 보관됩니다.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setForm({ category: '', question: '', answer: '', tags: '' })
              setSubmitted(false)
            }}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            또 추가하기
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className="px-5 py-2.5 bg-orange-500 text-white text-sm rounded-full"
          >
            검색으로 가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4">
      <div className="bg-blue-50 rounded-2xl p-3.5 mb-5 text-xs text-blue-600 leading-relaxed">
        💡 내가 아는 집수리 정보나 경험을 공유해보세요.
        <br />
        추가한 질문은 이 기기에 저장되며 검색에서 활용됩니다.
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 카테고리 */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            카테고리 <span className="text-orange-500">*</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat.id }))}
                className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all text-xs"
                style={{
                  borderColor: form.category === cat.id ? cat.color : 'transparent',
                  backgroundColor:
                    form.category === cat.id ? cat.color + '15' : '#F9FAFB',
                }}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-gray-600 text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 질문 */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            질문 <span className="text-orange-500">*</span>
          </label>
          <input
            type="text"
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
            placeholder="예: 베란다 방수 비용이 얼마나 드나요?"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
            maxLength={100}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{form.question.length}/100</p>
        </div>

        {/* 답변 */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            답변 <span className="text-orange-500">*</span>
          </label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            placeholder="알고 있는 내용을 자세히 적어주세요..."
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all resize-none"
            maxLength={1000}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{form.answer.length}/1000</p>
        </div>

        {/* 태그 */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            태그 <span className="text-gray-400 font-normal">(선택, 쉼표 구분)</span>
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="예: 방수, 비용, 베란다"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: isValid ? '#FF6B35' : undefined, color: isValid ? 'white' : undefined }}
        >
          질문 추가하기
        </button>
      </form>
    </div>
  )
}
