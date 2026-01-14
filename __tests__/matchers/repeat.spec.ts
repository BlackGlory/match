import { describe, it, test, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { repeat } from '@matchers/repeat.js'
import { createContext } from '@test/utils.js'

describe(`
  repeat<T extends Node>(
    number: number
  , matcher: INestedMatcher<T> | ITerminalMatcher<T>
  ): ISkipMatcher<T>
`, () => {
  describe('match', () => {
    it('return number', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValue(true)
      const [node1, node2] = parseNodes('<div></div><div></div>')

      const match = repeat(2, matcher)
      const result = match.call(context, node1)

      expect(result).toBe(2)
      expect(matcher).toBeCalledTimes(2)
      expect(matcher).nthCalledWith(1, node1)
      expect(matcher).nthCalledWith(2, node2)
    })
  })

  describe('not match', () => {
    it('return false', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
      const [node1, node2] = parseNodes('<div></div><div></div>')

      const match = repeat(2, matcher)
      const result = match.call(context, node1)

      expect(result).toBe(false)
      expect(matcher).toBeCalledTimes(2)
      expect(matcher).nthCalledWith(1, node1)
      expect(matcher).nthCalledWith(2, node2)
    })
  })

  test('edge: number = 0', () => {
    const context = createContext()
    const matcher = vi.fn().mockReturnValue(true)
    const [node] = parseNodes('<div></div><div></div>')

    const match = repeat(0, matcher)
    const result = match.call(context, node)

    expect(result).toBe(0)
    expect(matcher).toBeCalledTimes(0)
  })
})
