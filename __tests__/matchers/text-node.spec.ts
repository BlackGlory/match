import { parse } from 'extra-dom'
import { textNode } from '@matchers/text-node'
import { createContext } from '@test/utils'

describe('textNode(...matchers: Array<INestedMatcher<Node>>): INestedMatcher<Node>', () => {
  describe('node is a text node', () => {
    it('return true', () => {
      const context = createContext()
      const node = parse('text')[0]
      const matcher = jest.fn().mockReturnValue(true)

      const match = textNode(matcher)
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(context.collection).toStrictEqual({})
      expect(matcher).toBeCalledWith(node)
    })
  })

  describe('node is not a text node', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('<div></div>')[0]
      const matcher = jest.fn().mockReturnValue(true)

      const match = textNode(matcher)
      const result = match.call(context, node)

      expect(result).toBe(false)
      expect(context.collection).toStrictEqual({})
      expect(matcher).not.toBeCalled()
    })
  })
})

describe('textNode(name: string, ...matchers: Array<INestedMatcher<Node>>): INestedMatcher<Node>', () => {
  describe('match', () => {
    it('return true and save node into collection', () => {
      const context = createContext()
      const node = parse('text')[0]

      const match = textNode('test')
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(context.collection).toStrictEqual({ test: node })
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('<div></div>')[0]

      const match = textNode('test')
      const result = match.call(context, node)

      expect(result).toBe(false)
      expect(context.collection).toStrictEqual({})
    })
  })
})
