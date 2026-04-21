import { useState } from 'react'

const IMPROVEMENTS = [
  { icon: '🤖', title: 'AI 답변 연동', desc: 'Claude API로 실시간 질문 답변 (서버 필요)', done: false },
  { icon: '👥', title: '커뮤니티 공유', desc: '사용자 질문을 모두와 공유 (서버 필요)', done: false },
  { icon: '🔄', title: '자동 정보 수집', desc: '블로그·유튜브 크롤링 자동화 (서버 필요)', done: false },
  { icon: '🗺️', title: '지역별 업체 정보', desc: '지역 기반 시공업체 지도 (외부 API)', done: false },
  { icon: '📸', title: '시공 사진 첨부', desc: '질문에 사진 첨부 기능', done: false },
  { icon: '✅', title: 'PWA 오프라인', desc: 'Service Worker 완전 오프라인 지원', done: false },
]

export function FutureRoadmap() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-xs text-gray-400 py-2"
      >
        <span>🚀 향후 개선 예정 기능</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="bg-gray-50 rounded-2xl p-3">
          <div className="flex flex-col gap-2">
            {IMPROVEMENTS.map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <span className="text-base shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs font-medium text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-300 mt-3 text-center">
            현재 버전은 클라이언트 전용입니다
          </p>
        </div>
      )}
    </div>
  )
}
