import { useQAStore } from '@/stores/qaStore'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'
import clsx from 'clsx'
import { Bookmark, ThumbsUp, Share2, Lightbulb } from 'lucide-react'

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
        <span className="text-[11px] text-[#4E5968] bg-[#F2F4F6] px-2.5 py-1 rounded font-medium">
          {item.category}
        </span>
        {item.isFeatured && (
          <span className="text-[11px] bg-[#F2F4F6] text-[#4E5968] px-2.5 py-1 rounded font-medium">
            인기 질문
          </span>
        )}
        {item.isUserAdded && (
          <span className="text-[11px] bg-[#F2F4F6] text-[#4E5968] px-2.5 py-1 rounded font-medium">
            내가 추가
          </span>
        )}
      </div>

      <h2 className="text-[20px] font-bold text-[#191F28] leading-tight tracking-tight mb-5">{item.question}</h2>

      <div className="bg-white border border-[#E5E8EB] rounded-xl p-4 mb-6">
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-5 h-5 rounded-full bg-[#E6F5EC] flex items-center justify-center">
            <Lightbulb className="w-3 h-3 text-[#00A35C]" strokeWidth={2.5}/>
          </div>
          <span className="text-[13px] font-semibold text-[#00A35C]">답변</span>
        </div>
        <p className="text-[14px] text-[#333D4B] leading-relaxed whitespace-pre-line">{item.answer}</p>
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
                className="flex items-center gap-2 bg-white border border-[#E5E8EB] rounded-lg px-3 py-2.5 text-sm text-[#191F28] active:bg-[#E6F5EC] active:text-[#00A35C]"
              >
                <span className="text-base">{linkIcon(link.type)}</span>
                <span className="flex-1 truncate">{link.title}</span>
                <span className="text-[#00A35C] text-xs font-bold">→</span>
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
              className="text-[12px] bg-[#F2F4F6] text-[#4E5968] px-3 py-1.5 rounded-full font-medium active:bg-[#E6F5EC] active:text-[#00A35C]"
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
                className="text-left bg-[#F7F8FA] rounded-xl px-3 py-2.5 text-xs text-[#4E5968] active:bg-[#E6F5EC] active:text-[#00A35C] transition-colors"
              >
                → {related.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-4 border-t border-[#E5E8EB]">
        <button
          onClick={() => incrementLike(item.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#F2F4F6] rounded-lg text-[13px] text-[#4E5968] font-medium active:bg-[#E6F5EC] active:text-[#00A35C]"
        >
          <ThumbsUp className="w-4 h-4" strokeWidth={2}/>
          <span>도움됐어요 {totalLikes}</span>
        </button>
        <button
          onClick={() => toggleFavorite(item.id)}
          className={clsx(
            'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-medium',
            isFav ? 'bg-[#E6F5EC] text-[#00A35C]' : 'bg-[#F2F4F6] text-[#4E5968]',
          )}
        >
          <Bookmark className={clsx("w-4 h-4", isFav && "fill-[#00A35C]")} strokeWidth={2}/>
          <span>{isFav ? '저장됨' : '저장'}</span>
        </button>
        <button
          onClick={handleShare}
          className="w-11 h-11 flex items-center justify-center bg-[#F2F4F6] rounded-lg text-[#4E5968] active:bg-[#E5E8EB]"
        >
          <Share2 className="w-4 h-4" strokeWidth={2}/>
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
