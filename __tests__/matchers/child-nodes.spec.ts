import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { childNodes } from '@matchers/child-nodes.js'
import { createContext } from '@test/utils.js'

describe('childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node>', () => {
  describe('matchers.length = 0', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const [node] = parseNodes('<div></div>')

        const match = childNodes()
        const result = match.call(context, node)

        expect(result).toBe(true)
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const [node] = parseNodes('<div><div></div></div>')

        const match = childNodes()
        const result = match.call(context, node)

        expect(result).toBe(false)
      })
    })
  })

  describe('matchers.length > 0', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValueOnce(true)
        const [node] = parseNodes('<div><div></div></div>')
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
        const matcher = vi.fn().mockReturnValueOnce(false)
        const [node] = parseNodes('<div><div></div></div>')
        const [childNode] = node.childNodes

        const match = childNodes(matcher)
        const result = match.call(context, node)

        expect(result).toBe(false)
        expect(matcher).toBeCalledWith(childNode)
      })
    })
  })
})
