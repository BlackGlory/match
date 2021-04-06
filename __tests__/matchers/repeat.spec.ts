import { parse } from 'extra-dom'
import { repeat } from '@matchers/repeat'
import { createContext } from '@test/utils'

describe(`
  repeat<T extends Node>(
    number: number
  , matcher: INestedMatcher<T> | ITerminalMatcher<T>
  ): ISkipMatcher<T>
`, () => {
  describe('match', () => {
    it('return number', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValue(true)
      const [node1, node2] = parse('<div></div><div></div>')

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
      const matcher = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
      const [node1, node2] = parse('<div></div><div></div>')

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
    const matcher = jest.fn().mockReturnValue(true)
    const [node] = parse('<div></div><div></div>')

    const match = repeat(0, matcher)
    const result = match.call(context, node)

    expect(result).toBe(0)
    expect(matcher).toBeCalledTimes(0)
  })
})
