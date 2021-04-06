import { parse } from 'extra-dom'
import { multiple } from '@matchers/multiple'
import { createContext } from '@test/utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

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
      const matcher = jest.fn().mockReturnValue(true)
      const [node] = parse('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: true })
      const result = match.call(context, node) as Iterable<number>
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([2, 1, 0])
    })

    describe('match', () => {
      it('return number', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(true)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: true })
        const result = match.call(context, node) as Iterable<number>
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([2, 1])
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(false)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: true })
        const result = match.call(context, node) as Iterable<number>
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })
  })

  describe('greedy = false', () => {
    test('edge: min = 0, max = Infinity', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const [node] = parse('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: false })
      const result = match.call(context, node) as Iterable<number>
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([0, 1, 2])
    })

    describe('match', () => {
      it('return number', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(true)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const result = match.call(context, node) as Iterable<number>
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([1, 2])
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(false)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const result = match.call(context, node) as Iterable<number>
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })
  })
})
