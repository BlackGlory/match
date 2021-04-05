import { parse } from 'extra-dom'
import { anyOf } from '@matchers/any-of'
import { createContext } from '@test/utils'

describe('anyOf<T extends Node>(...matchers: INestedMatcher<T> | ITerminalMatcher<T>): INestedMatcher<T>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const matcher1 = jest.fn().mockReturnValue(false)
      const matcher2 = jest.fn().mockReturnValue(true)
      const matcher3 = jest.fn().mockReturnValue(false)
      const node = parse('test')[0]

      const match = anyOf(matcher1, matcher2, matcher3)
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(matcher1).toBeCalledWith(node)
      expect(matcher2).toBeCalledWith(node)
      expect(matcher3).not.toBeCalled()
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const matcher1 = jest.fn().mockReturnValue(false)
      const matcher2 = jest.fn().mockReturnValue(false)
      const node = parse('test')[0]

      const match = anyOf(matcher1, matcher2)
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
