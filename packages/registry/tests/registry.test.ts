import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { authoredResourceSchema } from '../src/schema'
import { searchResources } from '../src/query'
import type { PublishedResource, Registry } from '../src/schema'

const resource: PublishedResource = {
  schemaVersion: 1,
  registryVersion: '1.0.0',
  id: 'prompt-input',
  kind: 'component',
  title: 'Prompt Input',
  category: 'AI Input',
  summary: 'Composes an AI request.',
  status: 'beta',
  access: 'free',
  discovery: { intents: ['ask an AI'], useFor: ['natural-language prompts'], avoidFor: ['ordinary search'], keywords: ['composer'] },
  composition: {},
  relations: [],
  accessibility: { requirements: ['Provide an accessible name.'] },
  guidance: { design: ['Keep actions clear.'], implementation: ['Use a form.'], commonMistakes: ['Avoid boolean feature flags.'] },
  exampleIds: [],
  examples: [],
  searchText: 'prompt input ask an AI natural-language prompts composer',
}

describe('registry foundation', () => {
  it('rejects an invalid lifecycle', () => {
    expect(() => authoredResourceSchema.parse({ ...resource, status: 'done' })).toThrow()
  })

  it('discovers a component from user intent', () => {
    const registry: Registry = { schemaVersion: 1, registryVersion: '1.0.0', resources: [resource] }
    expect(searchResources(registry, 'ask AI')[0]?.resource.id).toBe('prompt-input')
  })

  it('builds a deterministic empty registry', async () => {
    const output = JSON.parse(await readFile(new URL('../dist/registry/v1/index.json', import.meta.url), 'utf8')) as Registry
    expect(output).toEqual({ schemaVersion: 1, registryVersion: '1.0.0', resources: [] })
  })
})
