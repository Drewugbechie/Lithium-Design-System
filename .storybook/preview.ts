import type { Preview } from '@storybook/react-vite'

import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f6f1ea' },
        { name: 'white', value: '#fffdf9' },
        { name: 'ink', value: '#201815' },
      ],
    },
  },
}

export default preview
