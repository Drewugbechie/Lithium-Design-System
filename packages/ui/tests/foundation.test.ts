import { describe, expect, it } from 'vitest'
import { cx } from '../src'

describe('UI foundation', () => {
  it('joins conditional class names', () => {
    expect(cx('button', false, undefined, 'active')).toBe('button active')
  })
})
