import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { optional } from '@matchers/optional.js'
import { createContext } from '@test/utils.js'
import { toArray } from 'iterable-operator'

describe('optional<T extends Node>(matcher: INestedMatcher<T> | ITerminalMatcher<T>): ISkipMatcher<T> ', () => {
  describe('match', () => {
    it('return Iterable<number>', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValue(true)
      const node = parseNodes('test')[0]

      const match = optional(matcher)
      const iter = match.call(context, node) as Iterable<number>
      const result = toArray(iter)

      expect(result).toEqual([1, 0])
      expect(matcher).toBeCalledWith(node)
    })
  })

  describe('does not match', () => {
    it('return Iterable<number>', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValue(false)
      const node = parseNodes('test')[0]

      const match = optional(matcher)
      const iter = match.call(context, node) as Iterable<number>
      const result = toArray(iter)

      expect(result).toEqual([0])
      expect(matcher).toBeCalledWith(node)
    })
  })
})
