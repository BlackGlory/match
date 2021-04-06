import { parse } from 'extra-dom'
import { multiple } from '@matchers/multiple'
import { createContext } from '@test/utils'

describe(`
  multiple<T extends Node>(
    number: number
  , matcher: INestedMatcher<T> | ITerminalMatcher<T>
  ): ISkipMatcher<T>
`, () => {
  describe('match', () => {
    it('return number', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const [node1, node2] = parse('<div></div><div></div>')

      const match = multiple(2, matcher)
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
      const matcher = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
      const [node1, node2] = parse('<div></div><div></div>')

      const match = multiple(2, matcher)
      const result = match.call(context, node1)

      expect(result).toBe(false)
      expect(matcher).toBeCalledTimes(2)
      expect(matcher).nthCalledWith(1, node1)
      expect(matcher).nthCalledWith(2, node2)
    })
  })

  test('edge: number = 0', () => {
    const context = createContext()
    const matcher = jest.fn().mockReturnValue(true)
    const [node] = parse('<div></div><div></div>')

    const match = multiple(0, matcher)
    const result = match.call(context, node)

    expect(result).toBe(0)
    expect(matcher).toBeCalledTimes(0)
  })
})

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
      const [node1, node2] = parse('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: true })
      const result = match.call(context, node1)

      expect(result).toBe(2)
      expect(matcher).toBeCalledTimes(2)
      expect(matcher).nthCalledWith(1, node1)
      expect(matcher).nthCalledWith(2, node2)
    })

    describe('match', () => {
      describe('max', () => {
        it('return number', () => {
          const context = createContext()
          const matcher = jest.fn().mockReturnValue(true)
          const [node1, node2] = parse('<div></div><div></div>')

          const match = multiple([1, 2], matcher, { greedy: true })
          const result = match.call(context, node1)

          expect(result).toBe(2)
          expect(matcher).toBeCalledTimes(2)
          expect(matcher).nthCalledWith(1, node1)
          expect(matcher).nthCalledWith(2, node2)
        })
      })

      describe('not max', () => {
        it('return number', () => {
          const context = createContext()
          const matcher = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
          const [node1, node2] = parse('<div></div><div></div>')

          const match = multiple([1, 2], matcher, { greedy: true })
          const result = match.call(context, node1)

          expect(result).toBe(1)
          expect(matcher).toBeCalledTimes(2)
          expect(matcher).nthCalledWith(1, node1)
          expect(matcher).nthCalledWith(2, node2)
        })
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(false)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: true })
        const result = match.call(context, node)

        expect(result).toBe(false)
        expect(matcher).toBeCalledTimes(1)
        expect(matcher).nthCalledWith(1, node)
      })
    })
  })

  describe('greedy = false', () => {
    test('edge: min = 0, max = Infinity', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const [node] = parse('<div></div><div></div>')

      const match = multiple([0, Infinity], matcher, { greedy: false })
      const result = match.call(context, node)

      expect(result).toBe(0)
      expect(matcher).toBeCalledTimes(0)
    })

    describe('match', () => {
      it('return number', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValue(true)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const result = match.call(context, node)

        expect(result).toBe(1)
        expect(matcher).toBeCalledTimes(1)
        expect(matcher).nthCalledWith(1, node)
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
        const [node] = parse('<div></div><div></div>')

        const match = multiple([1, 2], matcher, { greedy: false })
        const result = match.call(context, node)

        expect(result).toBe(1)
        expect(matcher).toBeCalledTimes(1)
        expect(matcher).nthCalledWith(1, node)
      })
    })
  })
})
