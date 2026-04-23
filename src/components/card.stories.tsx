import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    eyebrow: 'Foundation',
    title: 'Design tokens',
    description:
      'Centralize your colors, spacing, radius, and shadows before you build more component variants.',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  render: (args) => (
    <div className="w-[340px]">
      <Card {...args}>
        <div className="rounded-2xl bg-wash px-4 py-3 text-sm text-muted">
          Start by reviewing the spacing scale in Storybook and cross-checking
          it against your Figma file.
        </div>
      </Card>
    </div>
  ),
}
