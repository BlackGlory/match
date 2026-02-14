import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { node } from '@matchers/node.js'
import { createContext } from '@test/utils.js'

describe('textNode', () => {
  describe('(...matchers: Array<INestedMatcher<Node>>): INestedMatcher<Node>', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const _node = parseNodes('text')[0]
        const matcher = vi.fn().mockReturnValue(true)

        const match = node(matcher)
        const result = match.call(context, _node)

        expect(result).toBe(true)
        expect(context.collection).toStrictEqual({})
        expect(matcher).toBeCalledWith(_node)
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const _node = parseNodes('text')[0]
        const matcher = vi.fn().mockReturnValue(false)

        const match = node(matcher)
        const result = match.call(context, _node)

        expect(result).toBe(false)
        expect(context.collection).toStrictEqual({})
        expect(matcher).toBeCalledWith(_node)
      })
    })
  })

  describe('(name: string, ...matchers: Array<INestedMatcher<Node>>): INestedMatcher<Node>', () => {
    describe('match', () => {
      it('return true and save node into collection', () => {
        const context = createContext()
        const _node = parseNodes('text')[0]
        const matcher = vi.fn().mockReturnValue(true)

        const match = node('test', matcher)
        const result = match.call(context, _node)
        expect(result).toBe(true)
        expect(context.collection).toStrictEqual({ test: _node })
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const _node = parseNodes('text')[0]
        const matcher = vi.fn().mockReturnValue(false)

        const match = node('test', matcher)
        const result = match.call(context, _node)

        expect(result).toBe(false)
        expect(context.collection).toStrictEqual({})
        expect(matcher).toBeCalledWith(_node)
      })
    })
  })
})
