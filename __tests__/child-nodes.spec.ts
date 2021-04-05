import { parse } from 'extra-dom'
import { childNodes } from '@matchers/child-nodes'
import { createContext } from '@test/utils'

describe('childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValueOnce(true)
      const [node] = parse('<div><div></div></div>')
      const [childNode] = node.childNodes

      const match = childNodes(matcher)
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(matcher).toBeCalledWith(childNode)
    })
  })

  describe('not match', () => {
    it('return false', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValueOnce(false)
      const [node] = parse('<div><div></div></div>')
      const [childNode] = node.childNodes

      const match = childNodes(matcher)
      const result = match.call(context, node)

      expect(result).toBe(false)
      expect(matcher).toBeCalledWith(childNode)
    })
  })
})
