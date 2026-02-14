import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { tap } from '@matchers/tap.js'
import { createContext } from '@test/utils.js'

describe('tap', () => {
  it('returns the result of the matcher', () => {
    const context = createContext()
    const value = false
    const matcher = vi.fn().mockReturnValue(value)
    const callback = vi.fn(x => x)
    const node = parseNodes('<div></div>')[0] as Element

    const match = tap(matcher, callback)
    const result = match.call(context, node)

    expect(result).toBe(value)
    expect(matcher).toBeCalledWith(node)
    expect(callback).toBeCalledWith(value)
  })
})
