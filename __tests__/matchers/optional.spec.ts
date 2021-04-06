import { parse } from 'extra-dom'
import { optional } from '@matchers/optional'
import { createContext } from '@test/utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('optional<T extends Node>(matcher: INestedMatcher<T> | ITerminalMatcher<T>): ISkipMatcher<T> ', () => {
  describe('match', () => {
    it('return Iterable<number>', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const node = parse('test')[0]

      const match = optional(matcher)
      const result = match.call(context, node) as Iterable<number>
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 0])
      expect(matcher).toBeCalledWith(node)
    })
  })

  describe('does not match', () => {
    it('return Iterable<number>', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(false)
      const node = parse('test')[0]

      const match = optional(matcher)
      const result = match.call(context, node) as Iterable<number>
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([0])
      expect(matcher).toBeCalledWith(node)
    })
  })
})
