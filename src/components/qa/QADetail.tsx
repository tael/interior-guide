import { useQAStore } from '@/stores/qaStore'
import { CATEGORIES } from '@/constants/categories'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import clsx from 'clsx'

export function QADetail() {
  const { selectedItem, favorites, toggleFavorite, deleteUserQuestion, setSelectedItem, setActiveTab, search, likesMap, incrementLike, userQuestions } =
    useQAStore()

  const handleTagClick = (tag: string) => {
    setSelectedItem(null)
    setActiveTab('search')
    search(tag)
  }

  if (!selectedItem) return null

  const item = selectedItem
  const isFav = favorites.includes(item.id)
  const category = CATEGORIES.find((c) => c.id === item.category)
  const totalLikes = item.likes + (likesMap[item.id] ?? 0)

  const allItems = [...KNOWLEDGE_BASE, ...userQuestions]
  const relatedItems = allItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)

  const handleShare = async () => {
    const url = `https://tael.github.io/interior-guide/#share-${item.id}`
    const text = `[집수리 가이드] ${item.question}`
    if (navigator.share) {
      await navigator.share({ title: text, url })
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      alert('링크가 복사됐어요!')
    }
  }

  const handleDelete = () => {
    if (confirm('이 질문을 삭제할까요?')) {
      deleteUserQuestion(item.id)
      setSelectedItem(null)
    }
  }

  const linkIcon = (type: string) => {
    if (type === 'youtube') return '▶️'
    if (type === 'blog') return '📝'
    return '🔗'
  }

  return (
    <div className="pb-6">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ backgroundColor: category?.color + '20', color: category?.color }}
        >
          {category?.icon} {item.category}
        </span>
        {item.isFeatured && (
          <span className="text-xs bg-[#E5F9EE] text-[#03C75A] px-2.5 py-1 rounded-full font-medium">
            인기 질문
          </span>
        )}
        {item.isUserAdded && (
          <span className="text-xs bg-blue-50 text-blue-500 px-2.5 py-1 rounded-full font-medium">
            내가 추가
          </span>
        )}
      </div>

      <h2 className="text-lg font-bold text-gray-800 leading-snug mb-5">{item.question}</h2>

      <div className="bg-white border border-[#03C75A]/20 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-base">💡</span>
          <span className="text-sm font-semibold text-[#03C75A] font-bold">답변</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
      </div>

      {item.relatedLinks.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">관련 자료</h4>
          <div className="flex flex-col gap-2">
            {item.relatedLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-[#EBEBEB] rounded-lg px-3 py-2.5 text-sm text-[#222222] active:bg-[#E5F9EE] active:text-[#03C75A]"
              >
                <span className="text-base">{linkIcon(link.type)}</span>
                <span className="flex-1 truncate">{link.title}</span>
                <span className="text-[#03C75A] text-xs font-bold">→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full active:bg-[#E5F9EE] active:text-[#02A549] transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {relatedItems.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">같은 카테고리 질문</h4>
          <div className="flex flex-col gap-2">
            {relatedItems.map((related) => (
              <button
                key={related.id}
                onClick={() => setSelectedItem(related)}
                className="text-left bg-gray-50 rounded-xl px-3 py-2.5 text-xs text-gray-600 active:bg-[#E5F9EE] active:text-[#02A549] transition-colors"
              >
                → {related.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => incrementLike(item.id)}
          className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 active:bg-[#E5F9EE] active:text-[#03C75A] transition-colors"
        >
          <span>👍</span>
          <span>도움됐어요 {totalLikes}</span>
        </button>
        <button
          onClick={() => toggleFavorite(item.id)}
          className={clsx(
            'flex items-center gap-1.5 text-sm rounded-full px-4 py-2 transition-colors',
            isFav ? 'bg-yellow-50 text-yellow-500' : 'bg-gray-50 text-gray-500',
          )}
        >
          <span>{isFav ? '★' : '☆'}</span>
          <span>{isFav ? '저장됨' : '저장'}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 active:bg-blue-50 active:text-blue-500 transition-colors"
        >
          <span>↗️</span>
          <span>공유</span>
        </button>
      </div>

      {item.isUserAdded && (
        <button
          onClick={handleDelete}
          className="mt-4 w-full text-sm text-red-400 py-2 border border-red-100 rounded-xl"
        >
          이 질문 삭제
        </button>
      )}
    </div>
  )
}
