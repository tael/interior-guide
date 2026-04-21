import { describe, it, expect } from 'vitest'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'

describe('KNOWLEDGE_BASE', () => {
  it('최소 30개 이상 항목 존재', () => {
    expect(KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(30)
  })

  it('모든 항목에 필수 필드 존재', () => {
    KNOWLEDGE_BASE.forEach((item) => {
      expect(item.id).toBeTruthy()
      expect(item.category).toBeTruthy()
      expect(item.question).toBeTruthy()
      expect(item.answer).toBeTruthy()
      expect(Array.isArray(item.tags)).toBe(true)
      expect(Array.isArray(item.relatedLinks)).toBe(true)
      expect(typeof item.likes).toBe('number')
    })
  })

  it('ID 중복 없음', () => {
    const ids = KNOWLEDGE_BASE.map((i) => i.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('relatedLinks에 유효한 URL 존재', () => {
    KNOWLEDGE_BASE.forEach((item) => {
      item.relatedLinks.forEach((link) => {
        expect(link.url).toMatch(/^https?:\/\//)
        expect(link.title).toBeTruthy()
        expect(['youtube', 'blog', 'site']).toContain(link.type)
      })
    })
  })
})
