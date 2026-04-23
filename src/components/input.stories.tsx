import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email address',
    placeholder: 'name@company.com',
    hint: 'Use a real field label from your product, not a Figma layer name.',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: 'team@lithium.design',
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Read only',
    disabled: true,
  },
}
