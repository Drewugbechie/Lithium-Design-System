import { Button } from './components/button'
import { Card } from './components/card'
import { Input } from './components/input'

const foundations = [
  { label: 'Brand', value: 'Ochre / Ink / Canvas' },
  { label: 'Typography', value: 'System sans with a strong display scale' },
  { label: 'Radius', value: '16 / 24 / 32' },
  { label: 'Shadow', value: 'Soft elevation with warm contrast' },
]

function App() {
  return (
    <main className="min-h-screen bg-canvas px-6 py-10 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="grid gap-6 rounded-4xl border border-line bg-white px-6 py-8 shadow-soft sm:px-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-line bg-wash px-4 py-2 text-sm font-medium text-muted">
              React + Tailwind + Storybook
            </div>
            <div className="space-y-4">
              <p className="max-w-xl font-display text-5xl leading-none tracking-tight sm:text-6xl">
                Build your design system from Figma without pulling in extra
                abstraction.
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                This starter gives you a lean component workspace: design
                tokens, a first set of React components, and Storybook for
                reviewing states in isolation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button kind="filled" status="primary" size="md">
                Primary action
              </Button>
              <Button kind="outlined" status="primary" size="md">
                Secondary
              </Button>
              <Button kind="text" status="primary" size="md">
                Ghost
              </Button>
            </div>
          </div>

          <Card
            eyebrow="First milestone"
            title="Ship the first 3 components"
            description="Use Button, Card, and Input as your pattern library. Once those feel stable, start mapping Figma variants into consistent props."
          >
            <div className="grid gap-4">
              <Input
                label="Starter field"
                placeholder="Write the production label here"
                hint="Review this in Storybook and compare spacing against Figma."
              />
              <div className="grid gap-3 text-sm text-muted">
                <div className="flex items-center justify-between rounded-2xl bg-wash px-4 py-3">
                  <span>Button states</span>
                  <span className="font-medium text-ink">Ready</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-wash px-4 py-3">
                  <span>Story coverage</span>
                  <span className="font-medium text-ink">Started</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-wash px-4 py-3">
                  <span>Figma sync</span>
                  <span className="font-medium text-ink">Manual by design</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {foundations.map((item) => (
            <Card
              key={item.label}
              eyebrow="Foundation"
              title={item.label}
              description={item.value}
            />
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
