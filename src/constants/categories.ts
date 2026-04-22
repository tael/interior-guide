import type { Category } from '@/types/qa'

export const CATEGORIES: Category[] = [
  { id: '도배', name: '도배', icon: '🖌️', iconName: 'Paintbrush', description: '도배지 종류·비용·시공', color: '#FF6B35' },
  { id: '바닥재', name: '바닥재', icon: '🪵', iconName: 'Grid2x2', description: '마루·장판·타일 선택', color: '#8B5E3C' },
  { id: '화장실', name: '화장실', icon: '🚿', iconName: 'ShowerHead', description: '욕실 리모델링·방수', color: '#4A9EBF' },
  { id: '샤시창호', name: '샤시·창호', icon: '🪟', iconName: 'AppWindow', description: '창문 교체·단열', color: '#6C8EAD' },
  { id: '주방', name: '주방', icon: '🍳', iconName: 'ChefHat', description: '싱크대·타일·후드', color: '#E8A838' },
  { id: '전기조명', name: '전기·조명', icon: '💡', iconName: 'Lightbulb', description: '조명교체·콘센트·분전반', color: '#F4D03F' },
  { id: '방수누수', name: '방수·누수', icon: '💧', iconName: 'Droplets', description: '누수 원인·방수 시공', color: '#3498DB' },
  { id: '도장페인트', name: '도장·페인트', icon: '🎨', iconName: 'PaintBucket', description: '벽 페인트·셀프 도장', color: '#9B59B6' },
  { id: '철거구조', name: '철거·구조', icon: '🔨', iconName: 'Hammer', description: '벽체 철거·구조 변경', color: '#E74C3C' },
  { id: '기타', name: '기타', icon: '🏠', iconName: 'MoreHorizontal', description: '업체 선정·견적·팁', color: '#2ECC71' },
]
