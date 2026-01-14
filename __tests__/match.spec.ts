import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { match } from '@src/match.js'

describe(`
  match(
    this: void | Document
  , node: Node
  , ...matchers: Array<IMatcher<Node>>
  ): { [name: string]: Node | Node[] } | null
`, () => {
  describe('match', () => {
    it('return { [name: string]: Node | Node[] }', () => {
      const matcher1 = vi.fn().mockReturnValue(true)
      const matcher2 = vi.fn().mockReturnValue(true)
      const [node1, node2] = parseNodes('<div></div><div></div>')

      const result = match(node1, matcher1, matcher2)

      expect(result).toBeTruthy()
      expect(matcher1).toBeCalledWith(node1)
      expect(matcher2).toBeCalledWith(node2)
    })
  })

  describe('does not match', () => {
    it('return null', () => {
      const matcher1 = vi.fn().mockReturnValue(false)
      const matcher2 = vi.fn().mockReturnValue(true)
      const [node] = parseNodes('<div></div><div></div>')

      const result = match(node, matcher1, matcher2)

      expect(result).toBe(null)
      expect(matcher1).toBeCalledWith(node)
      expect(matcher2).not.toBeCalled()
    })
  })
})
