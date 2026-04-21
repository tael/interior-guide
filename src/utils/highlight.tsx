import type { ReactNode } from 'react'

export function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-orange-100 text-orange-700 rounded-sm px-0.5 not-italic">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
