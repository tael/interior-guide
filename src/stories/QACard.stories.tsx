import type { Meta, StoryObj } from '@storybook/react'
import { QACard } from '../components/qa/QACard'

const meta: Meta<typeof QACard> = {
  title: 'Components/QACard',
  component: QACard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof QACard>

const sampleItem = {
  id: 'story-001',
  category: '도배',
  question: '도배 비용이 얼마나 드나요?',
  answer: '일반 아파트 기준으로 방 1개(약 4.5평) 합지 도배는 15만–20만원, 실크 도배는 25만–35만원 정도입니다.',
  tags: ['도배', '비용', '합지'],
  likes: 142,
  isFeatured: true,
  relatedLinks: [
    { title: '도배 비용 유튜브', url: 'https://youtube.com', type: 'youtube' as const },
  ],
}

export const Default: Story = { args: { item: sampleItem } }
export const WithRank: Story = { args: { item: sampleItem, rank: 1 } }
export const Compact: Story = { args: { item: sampleItem, compact: true } }
export const UserAdded: Story = {
  args: { item: { ...sampleItem, isUserAdded: true, isFeatured: false } },
}
