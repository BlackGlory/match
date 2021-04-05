import { parse } from 'extra-dom'
import { element } from '@matchers/element'
import { createContext } from '@test/utils'

describe('element(...matchers: Array<INestedMatcher<Element>>): INestedMatcher<Node>', () => {
  describe('node is an element', () => {
    it('return true', () => {
      const context = createContext()
      const node = parse('<div></div>')[0] as Element
      const matcher = jest.fn().mockReturnValue(true)

      const match = element(matcher)
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(context.collection).toStrictEqual({})
      expect(matcher).toBeCalledWith(node)
    })
  })

  describe('node is not an element', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('text')[0] as Node
      const matcher = jest.fn().mockReturnValue(true)

      const match = element(matcher)
      const result = match.call(context, node)

      expect(result).toBe(false)
      expect(context.collection).toStrictEqual({})
      expect(matcher).not.toBeCalled()
    })
  })
})

describe('element(name: string, ...matchers: Array<INestedMatcher<Element>>): INestedMatcher<Node>', () => {
  describe('match', () => {
    it('return true and save element into collection', () => {
      const context = createContext()
      const node = parse('<div></div>')[0] as Element

      const match = element('test')
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(context.collection).toStrictEqual({ test: node })
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('text')[0] as Node

      const match = element('test')
      const result = match.call(context, node)

      expect(result).toBe(false)
      expect(context.collection).toStrictEqual({})
    })
  })
})
