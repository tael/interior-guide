import type { QAItem } from '@/types/qa'

export interface ExportData {
  version: string
  exportedAt: string
  userQuestions: QAItem[]
  favorites: string[]
  likesMap: Record<string, number>
}

export function exportData(
  userQuestions: QAItem[],
  favorites: string[],
  likesMap: Record<string, number>,
): void {
  const data: ExportData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    userQuestions,
    favorites,
    likesMap,
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `집수리가이드_백업_${new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function parseImportData(json: string): ExportData | null {
  try {
    const data = JSON.parse(json) as ExportData
    if (!data.version || !Array.isArray(data.userQuestions)) return null
    return data
  } catch {
    return null
  }
}
