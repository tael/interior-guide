# TRD — 집수리 가이드

**Technical Requirements Document**
버전: 0.1.0 | 작성일: 2026-04-22

---

## 1. 기술 스택

| 레이어 | 기술 | 버전 | 선택 이유 |
|--------|------|------|----------|
| UI | React | 19 | Concurrent Mode, 최신 훅 지원 |
| 언어 | TypeScript | 5.8 | 타입 안전성, IDE 지원 |
| 빌드 | Vite | 6 | 빠른 HMR, ESM 네이티브 |
| 스타일 | Tailwind CSS | v4 | 유틸리티 퍼스트, 번들 최소화 |
| 상태 | Zustand | 5 | 보일러플레이트 없는 경량 상태관리 |
| 영속성 | localStorage | - | 서버 없이 데이터 유지 |
| 배포 | GitHub Pages | - | 무료, CI/CD 통합 |
| CI | GitHub Actions | - | 자동 빌드/배포 |

---

## 2. 아키텍처

```
┌─────────────────────────────────────────────────┐
│                  Browser (Mobile)                │
│  ┌──────────────────────────────────────────┐   │
│  │              React App (SPA)             │   │
│  │  ┌──────────┐  ┌────────────────────┐   │   │
│  │  │ Zustand  │  │    Components       │   │   │
│  │  │  Store   │◄─┤  - SearchPage       │   │   │
│  │  │          │  │  - BrowsePage       │   │   │
│  │  │ - state  │  │  - AddPage          │   │   │
│  │  │ - actions│  │  - FavoritesPage    │   │   │
│  │  └────┬─────┘  │  - QACard/Detail   │   │   │
│  │       │        └────────────────────┘   │   │
│  │  ┌────▼─────────────────────────────┐  │   │
│  │  │         localStorage              │  │   │
│  │  │  - favorites, userQuestions       │  │   │
│  │  │  - recentSearches, likesMap       │  │   │
│  │  └──────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

 Static Assets: GitHub Pages CDN
 CI/CD: GitHub Actions → dist/ → Pages
```

---

## 3. 디렉토리 구조

```
src/
├── components/
│   ├── add/          # 질문 추가 폼
│   ├── browse/       # 카테고리 탐색 + 비용계산기
│   ├── common/       # ErrorBoundary, ScrollToTop, FutureRoadmap
│   ├── favorites/    # 즐겨찾기 + 데이터 관리
│   ├── home/         # 검색 페이지
│   ├── layout/       # Header, BottomNav
│   └── qa/           # QACard, QADetail
├── constants/
│   ├── categories.ts  # 카테고리 정의
│   └── knowledgeBase.ts  # Q&A 데이터 (30개+)
├── stores/
│   └── qaStore.ts    # Zustand 전역 상태
├── types/
│   ├── qa.ts         # QAItem, Category, TabId
│   └── store.ts      # QAStore 인터페이스
└── utils/
    ├── exportImport.ts  # JSON 내보내기/가져오기
    ├── highlight.tsx    # 검색어 하이라이팅
    ├── search.ts        # 검색 로직 (점수 기반)
    └── storage.ts       # localStorage 유틸
```

---

## 4. 핵심 타입

```typescript
interface QAItem {
  id: string          // 'dob-001', 'user-1234567890'
  category: string    // 카테고리 ID
  question: string
  answer: string
  tags: string[]
  relatedLinks: RelatedLink[]
  likes: number       // 초기값 (사전 등재 기준)
  isUserAdded?: boolean
  createdAt?: string
  isFeatured?: boolean
}

interface RelatedLink {
  title: string
  url: string
  type: 'youtube' | 'blog' | 'site'
}
```

---

## 5. 검색 알고리즘

점수 기반 가중치 검색:

```
질문 포함: +3점
답변 포함: +2점
태그 포함: +2점
카테고리 포함: +1점

score = 0 → 결과에서 제외
결과: score 내림차순 정렬
```

시간복잡도: O(n × m) — n=항목 수, m=쿼리 길이. 100개 이하 항목에서 충분.

---

## 6. 상태 관리 (Zustand)

```
QAStore
├── activeTab        (search | browse | add | favorites)
├── searchQuery      (현재 검색어)
├── searchResults    (검색 결과 배열)
├── favorites        (즐겨찾기 ID 배열) → localStorage
├── userQuestions    (사용자 추가 Q&A) → localStorage
├── recentSearches   (최근 검색어) → localStorage
├── selectedItem     (현재 상세보기 항목)
├── likesMap         (ID → 추가 좋아요 수) → localStorage
└── actions:
    search(), clearSearch(), toggleFavorite(),
    addUserQuestion(), deleteUserQuestion(),
    setSelectedItem(), incrementLike(),
    importData(), clearRecentSearches()
```

---

## 7. localStorage 키 규칙

| 키 | 값 타입 | 설명 |
|----|---------|------|
| `ig_favorites` | string[] | 즐겨찾기 항목 ID 목록 |
| `ig_userQuestions` | QAItem[] | 사용자 추가 Q&A |
| `ig_recentSearches` | string[] | 최근 검색어 (max 8) |
| `ig_likes` | Record<string,number> | ID별 추가 좋아요 수 |

접두사 `ig_`로 다른 앱과 충돌 방지.

---

## 8. 빌드 / 배포

```yaml
# GitHub Actions (push to main)
1. npm install
2. tsc --noEmit         # 타입체크
3. vitest run           # 단위 테스트
4. vite build           # dist/ 생성
5. upload-pages-artifact
6. deploy-pages
```

빌드 결과: ~252KB JS (gzip 79KB), ~18KB CSS (gzip 4KB)

---

## 9. 테스트 전략

| 레이어 | 방식 | 파일 |
|--------|------|------|
| 유틸 함수 | Vitest 단위 테스트 | search.test.ts |
| 데이터 무결성 | Vitest 단위 테스트 | knowledgeBase.test.ts |
| 컴포넌트 | 수동 테스트 (모바일) | - |
| E2E | 미구현 (향후 Playwright) | - |

---

## 10. 성능 최적화

- Tailwind v4 → CSS 트리쉐이킹으로 최소 번들
- Zustand → React Context 대비 리렌더링 최소화
- `useMemo`로 오늘의 팁 재계산 방지
- `passive: true` 스크롤 이벤트 리스너
- 이미지 없음 → 이모지만 사용으로 이미지 요청 0

---

## 11. 보안 고려사항

- localStorage만 사용 — XSS 위험 있으나 민감 데이터 없음
- 외부 링크 `rel="noopener noreferrer"` 적용
- import시 JSON.parse 예외 처리
- URL 입력 필드: type="url" 브라우저 기본 검증

---

## 12. 향후 기술 개선 방향

| 항목 | 현재 | 개선안 |
|------|------|--------|
| AI 검색 | 정적 데이터 | Claude API streaming |
| 데이터 공유 | 로컬만 | Supabase / PlanetScale |
| 크롤링 | 수동 | Python 스케줄러 |
| 검색 | 단순 substring | Vector similarity |
| 이미지 | 없음 | Cloudinary / S3 |
