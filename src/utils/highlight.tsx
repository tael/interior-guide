import type { ReactNode } from 'react'

export function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) return text
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  // split with capture group → odd indices are the matched segments
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-[#E5F9EE] text-[#02A549] rounded-sm px-0.5 not-italic">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
