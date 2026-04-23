import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'

const kinds = ['filled', 'outlined', 'dashed', 'text'] as const
const statuses = ['default', 'primary', 'info'] as const
const states = ['default', 'hovered', 'pressed'] as const

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    kind: 'filled',
    status: 'default',
    state: 'default',
    size: 'sm',
    prefixIcon: true,
    suffixIcon: true,
    disabled: false,
    loading: false,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 bg-white p-6">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
}

export const StatusMatrix: Story = {
  render: () => (
    <div className="grid gap-8 bg-white p-6">
      {statuses.map((status) => (
        <section key={status} className="grid gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {status}
          </h3>
          <div className="grid gap-4">
            {kinds.map((kind) => (
              <div key={`${status}-${kind}`} className="flex flex-wrap items-center gap-4">
                {states.map((state) => (
                  <Button
                    key={`${status}-${kind}-${state}`}
                    kind={kind}
                    status={status}
                    state={state}
                    size="md"
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

export const DisabledAndLoading: Story = {
  render: () => (
    <div className="grid gap-6 bg-white p-6">
      <div className="flex flex-wrap items-center gap-4">
        {kinds.map((kind) => (
          <Button key={`disabled-${kind}`} kind={kind} status="info" size="lg" disabled>
            Button
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {kinds.map((kind) => (
          <Button key={`loading-${kind}`} kind={kind} status="info" size="lg" loading>
            Button
          </Button>
        ))}
      </div>
    </div>
  ),
}
