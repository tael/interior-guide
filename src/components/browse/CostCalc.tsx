import { useState } from 'react'

interface WorkType {
  id: string
  label: string
  icon: string
  minPerPy: number
  maxPerPy: number
  unit: string
}

const WORK_TYPES: WorkType[] = [
  { id: 'dob-silk', label: '도배 (실크)', icon: '🖌️', minPerPy: 5, maxPerPy: 9, unit: '만원/평' },
  { id: 'dob-paper', label: '도배 (합지)', icon: '📄', minPerPy: 3, maxPerPy: 5, unit: '만원/평' },
  { id: 'floor-maru', label: '마루 시공', icon: '🪵', minPerPy: 6, maxPerPy: 12, unit: '만원/평' },
  { id: 'floor-jangpan', label: '장판 시공', icon: '🟦', minPerPy: 2, maxPerPy: 5, unit: '만원/평' },
  { id: 'tile', label: '타일 시공', icon: '⬜', minPerPy: 8, maxPerPy: 25, unit: '만원/평' },
  { id: 'paint', label: '도장 (페인트)', icon: '🎨', minPerPy: 4, maxPerPy: 10, unit: '만원/평' },
]

export function CostCalc() {
  const [open, setOpen] = useState(false)
  const [area, setArea] = useState('')
  const [workId, setWorkId] = useState(WORK_TYPES[0].id)

  const work = WORK_TYPES.find((w) => w.id === workId)!
  const py = parseFloat(area) || 0
  const minCost = Math.round(py * work.minPerPy)
  const maxCost = Math.round(py * work.maxPerPy)

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 text-sm text-orange-700 font-medium"
      >
        <span>🧮 공사 비용 간단 계산기</span>
        <span className="text-orange-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 block mb-1.5">공사 종류</label>
            <div className="grid grid-cols-3 gap-1.5">
              {WORK_TYPES.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWorkId(w.id)}
                  className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs transition-all border-2"
                  style={{
                    borderColor: workId === w.id ? '#FF6B35' : 'transparent',
                    backgroundColor: workId === w.id ? '#FFF3EE' : '#F9FAFB',
                  }}
                >
                  <span>{w.icon}</span>
                  <span className="text-center leading-tight text-gray-600">{w.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              면적 (평)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="예: 25"
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-300"
              min="1"
              max="200"
            />
          </div>

          {py > 0 ? (
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">{py}평 {work.label} 예상 비용</p>
              <p className="text-xl font-bold text-orange-600">
                {minCost}만 – {maxCost}만원
              </p>
              <p className="text-xs text-gray-400 mt-1">
                자재·업체·지역에 따라 차이 있음. 반드시 견적 비교 권장.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-3 text-center text-xs text-gray-400">
              면적을 입력하면 예상 비용이 표시됩니다
            </div>
          )}
        </div>
      )}
    </div>
  )
}
