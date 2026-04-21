import { describe, it, expect } from 'vitest'
import { searchItems, getFeaturedItems, getPopularItems } from '@/utils/search'
import { KNOWLEDGE_BASE } from '@/constants/knowledgeBase'

describe('searchItems', () => {
  it('질문 텍스트로 검색', () => {
    const results = searchItems(KNOWLEDGE_BASE, '도배 비용')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].category).toBe('도배')
  })

  it('빈 쿼리는 빈 배열 반환', () => {
    expect(searchItems(KNOWLEDGE_BASE, '')).toEqual([])
    expect(searchItems(KNOWLEDGE_BASE, '   ')).toEqual([])
  })

  it('태그로도 검색됨', () => {
    const results = searchItems(KNOWLEDGE_BASE, '실크')
    expect(results.length).toBeGreaterThan(0)
  })

  it('없는 내용은 빈 배열', () => {
    const results = searchItems(KNOWLEDGE_BASE, 'xyzabcnotfound123')
    expect(results).toEqual([])
  })
})

describe('getFeaturedItems', () => {
  it('isFeatured 항목만 반환', () => {
    const featured = getFeaturedItems(KNOWLEDGE_BASE)
    expect(featured.length).toBeGreaterThan(0)
    featured.forEach((item) => expect(item.isFeatured).toBe(true))
  })
})

describe('getPopularItems', () => {
  it('likes 내림차순 정렬', () => {
    const popular = getPopularItems(KNOWLEDGE_BASE, 5)
    expect(popular.length).toBe(5)
    for (let i = 0; i < popular.length - 1; i++) {
      expect(popular[i].likes).toBeGreaterThanOrEqual(popular[i + 1].likes)
    }
  })
})
