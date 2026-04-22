import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
      viewports: {
        mobile1: { name: 'Mobile (375px)', styles: { width: '375px', height: '812px' } },
        mobile2: { name: 'Mobile Max (430px)', styles: { width: '430px', height: '932px' } },
      },
    },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#F5F5F5' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
}

export default preview
