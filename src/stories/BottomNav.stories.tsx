import type { Meta, StoryObj } from '@storybook/react'
import { BottomNav } from '../components/layout/BottomNav'

const meta: Meta<typeof BottomNav> = {
  title: 'Layout/BottomNav',
  component: BottomNav,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof BottomNav>

export const Default: Story = {}
