import { describe, test, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { multiple } from '@matchers/multiple.js'
import { createContext } from '@test/utils.js'
import { toArray } from 'iterable-operator'

describe(`
  multiple<T extends Node>(
    range: [min: number, max: number]
  , matcher: INestedMatcher<T> | ITerminalMatcher<T>
  , options?:  IMultipleOptions
  ): ISkipMatcher<T>
`, () => {
  describe('greedy = true', () => {
    test('edge: min = 0, max = Infinity', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValue(true)
      const [node] = parseNodes('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: true })
      const iter = match.call(context, node) as Iterable<number>
      const result = toArray(iter)

      expect(result).toEqual([2, 1, 0])
    })

    describe('match', () => {
      it('return number', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValue(true)
        const [node] = parseNodes('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: true })
        const iter = match.call(context, node) as Iterable<number>
        const result = toArray(iter)

        expect(result).toEqual([2, 1])
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValue(false)
        const [node] = parseNodes('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: true })
        const iter = match.call(context, node) as Iterable<number>
        const result = toArray(iter)

        expect(result).toEqual([])
      })
    })
  })

  describe('greedy = false', () => {
    test('edge: min = 0, max = Infinity', () => {
      const context = createContext()
      const matcher = vi.fn().mockReturnValue(true)
      const [node] = parseNodes('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: false })
      const iter = match.call(context, node) as Iterable<number>
      const result = toArray(iter)

      expect(result).toEqual([0, 1, 2])
    })

    describe('match', () => {
      it('return number', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValue(true)
        const [node] = parseNodes('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const iter = match.call(context, node) as Iterable<number>
        const result = toArray(iter)

        expect(result).toEqual([1, 2])
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValue(false)
        const [node] = parseNodes('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const iter = match.call(context, node) as Iterable<number>
        const result = toArray(iter)

        expect(result).toEqual([])
      })
    })
  })
})
