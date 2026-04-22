# 네이버 디자인 시스템 분석

interior-guide를 네이버 앱/웹의 디자인 시스템에 맞추기 위한 참조 문서입니다.

## 컬러 토큰

| 역할 | 값 | 16진수 | 용도 |
|------|-----|--------|------|
| Primary | 네이버 그린 | #03C75A | 주요 버튼, 활성 탭, 강조 요소 |
| Primary Dark | 진한 그린 | #02A549 | Hover, Active 상태 |
| Primary Light | 밝은 그린 | #E5F9EE | 배경, 뱃지 배경 |
| Text Primary | 진한 회색 | #222222 | 제목, 본문 텍스트 |
| Text Secondary | 중간 회색 | #555555 | 보조 텍스트 |
| Text Tertiary | 밝은 회색 | #999999 | 캡션, 비활성 텍스트 |
| Border | 밝은 회색 | #EBEBEB | 일반 테두리, 구분선 |
| Border Strong | 진한 회색 | #CCCCCC | 강조 테두리 |
| Background | 밝은 회색 | #F5F5F5 | 페이지 배경 |
| Background Card | 흰색 | #FFFFFF | 카드, 모달 배경 |
| Error | 빨강 | #FF4040 | 에러, 삭제 버튼 |
| Warning | 주황 | #FF9500 | 경고, 주의 문구 |

## 타이포그래피

폰트 스택: `-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif`

| 스타일 | 크기 | 굵기 | 색상 | 용도 |
|--------|------|------|------|------|
| Title Large | 18px | 700 | #222222 | 페이지 제목, 주요 헤딩 |
| Title Medium | 16px | 600 | #222222 | 섹션 제목, 카드 제목 |
| Body | 15px | 400 | #222222 | 본문, 일반 텍스트 |
| Body Small | 13px | 400 | #555555 | 보조 텍스트, 메타 정보 |
| Caption | 11px | 400 | #999999 | 캡션, 힌트 텍스트 |

## 간격 시스템

네이버는 4px 기반의 8단계 스케일을 사용합니다.

| 토큰 | 값 | 용도 |
|------|-----|------|
| xs | 4px | 미세한 간격 (아이콘 여백) |
| sm | 8px | 소형 요소 간 간격, 아이콘 좌우 패딩 |
| md | 16px | 기본 패딩, 요소 간 기본 간격 |
| lg | 24px | 섹션 간 간격 |
| xl | 32px | 큰 섹션 간 간격 |

## 그림자 (Shadow)

| 타입 | 값 | 용도 |
|------|-----|------|
| Card | 0 1px 3px rgba(0,0,0,0.08) | 카드 요소 |
| Modal | 0 4px 16px rgba(0,0,0,0.12) | 모달, 드롭다운 |

## 테두리 반경 (Border Radius)

| 크기 | 값 | 용도 |
|------|-----|------|
| Small | 4px | 버튼, 뱃지, 작은 요소 |
| Medium | 8px | 카드, 입력창, 보통 요소 |
| Large | 12px | 모달, 바텀시트, 큰 컴포넌트 |
| Full | 50px | 칩, 태그, 원형 요소 |

## 모바일 UI 패턴

### 상단 앱바
- 배경: #FFFFFF
- 높이: 56px (iOS), 48px (Android)
- 레이아웃: 좌측(로고 또는 백버튼) - 중앙(타이틀) - 우측(아이콘)
- 하단 테두리: 1px #EBEBEB

### 하단 탭바
- 배경: #FFFFFF
- 높이: 48px (기본 콘텐츠) + 세이프 에어리어
- 상단 테두리: 1px #EBEBEB
- Active 상태: #03C75A 텍스트, 굵기 600
- Inactive 상태: #999999 텍스트, 굵기 400

### 카드
- 배경: #FFFFFF
- 테두리: 1px #EBEBEB
- 반경: 8px (rounded-lg)
- 패딩: 16px (md)
- 그림자: 0 1px 3px rgba(0,0,0,0.08)

### 리스트 아이템
- 좌우 패딩: 16px (md)
- 최소 높이: 48px
- 하단 구분선: 1px solid #EBEBEB
- 마지막 아이템은 구분선 생략

### 버튼
- 높이: 44px (최소 터치 영역)
- 패딩: 0 16px (좌우)
- 반경: 8px (rounded-lg)
- 배경(기본): #03C75A
- 텍스트: #FFFFFF, 600 굵기
- Hover: #02A549 배경
- Disabled: #CCCCCC 배경, 회색 텍스트

### 검색창
- 배경: #FFFFFF
- 테두리: 1px #EBEBEB
- 반경: 22px (pill 스타일)
- 좌우 아이콘 여백: 8px (sm)
- 패딩(텍스트): 8px 12px
- Focus: 1px #03C75A 테두리

### 뱃지
- 배경: #E5F9EE
- 텍스트: #03C75A
- 반경: 4px (rounded-sm)
- 패딩: 4px 8px

### 구분선
- 스타일: 1px solid #EBEBEB
- 마진: 0 (좌우 마진 없음, 전체 너비)

## interior-guide 대비 변경점

### 컬러 전환
| 항목 | 기존 | 변경 | 이유 |
|------|------|------|------|
| Primary Color | #FF6B35 (주황) | #03C75A (네이버 그린) | 네이버 브랜드 색상 통일 |
| Primary Dark | #E55100 | #02A549 | 다크 모드 대응 |
| Primary Light | #FFE4D6 | #E5F9EE | 밝은 배경 톤 통일 |

### 컴포넌트 반경 조정
| 컴포넌트 | 기존 | 변경 |
|----------|------|------|
| 카드 반경 | 16px (rounded-2xl) | 8px (rounded-lg) |
| 버튼 반경 | 8px | 8px (유지) |
| 검색창 | 원형 | 22px (pill) |

### 탭바 활성화 상태
- 기존: Orange highlight (#FF6B35)
- 변경: Green highlight (#03C75A) + Bold text (600)

### 입력 필드 포커스
- 기존: Orange focus ring
- 변경: Green border (1px #03C75A)

### 배경색
- 기존: #F5F5F5
- 변경: #F5F5F5 (네이버와 동일하므로 유지)

## 마이그레이션 체크리스트

- [ ] Tailwind 컬러 토큰 업데이트 (orange → green)
- [ ] 카드 rounded-2xl → rounded-lg 변경
- [ ] 버튼 primary 색상 변경
- [ ] 탭바 active 색상 변경
- [ ] 검색창 스타일 pill 형태로 변경
- [ ] 포커스 ring 색상 변경 (orange → green)
- [ ] 뱃지 배경/텍스트 색상 변경
- [ ] 섹션 간 간격 md(16px) 또는 lg(24px) 통일
- [ ] 그림자 토큰 적용 검토
- [ ] 모바일/웹 반응형 브레이크포인트 검토
