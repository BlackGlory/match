import { parse } from 'extra-dom'
import { optional } from '@matchers/optional'
import { createContext } from '@test/utils'

describe('optional<T extends Node>(matcher: INestedMatcher<T> | ITerminalMatcher<T>): ISkipMatcher<T> ', () => {
  describe('match', () => {
    it('return 1', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const node = parse('test')[0]

      const match = optional(matcher)
      const result = match.call(context, node)

      expect(result).toBe(1)
      expect(matcher).toBeCalledWith(node)
    })
  })

  describe('does not match', () => {
    it('return 0', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(false)
      const node = parse('test')[0]

      const match = optional(matcher)
      const result = match.call(context, node)

      expect(result).toBe(0)
      expect(matcher).toBeCalledWith(node)
    })
  })
})
