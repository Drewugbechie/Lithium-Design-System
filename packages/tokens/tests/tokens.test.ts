import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

const dist = new URL('../dist/', import.meta.url)

describe('generated tokens', () => {
  it('emits stable variables for every foundation category', async () => {
    const css = await readFile(new URL('theme.css', dist), 'utf8')
    expect(css).toContain('--li-color-background:')
    expect(css).toContain('--li-radius-md:')
    expect(css).toContain('--li-shadow-sm:')
    expect(css).toContain('--li-motion-duration-fast:')
    expect(css).toContain('[data-theme="dark"]')
  })

  it('emits deterministic output without timestamps', async () => {
    const json = await readFile(new URL('tokens.json', dist), 'utf8')
    expect(json).not.toContain('generatedAt')
  })
})
