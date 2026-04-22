import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '../components/layout/Header'

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
