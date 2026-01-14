import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { children } from '@matchers/children.js'
import { createContext } from '@test/utils.js'

describe('children(...matchers: Array<IMatcher<Element>>): INestedMatcher<Element>', () => {
  describe('matchers.length = 0', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const element = parseNodes('<div> </div>')[0] as Element

        const match = children()
        const result = match.call(context, element)

        expect(result).toBe(true)
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const element = parseNodes('<div> <div></div> </div>')[0] as Element

        const match = children()
        const result = match.call(context, element)

        expect(result).toBe(false)
      })
    })
  })

  describe('matchers.length > 0', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValueOnce(true)
        const element = parseNodes('<div> <div></div> </div>')[0] as Element
        const [childElement] = element.children

        const match = children(matcher)
        const result = match.call(context, element)

        expect(result).toBe(true)
        expect(matcher).toBeCalledWith(childElement)
      })
    })

    describe('not match', () => {
      it('return false', () => {
        const context = createContext()
        const matcher = vi.fn().mockReturnValueOnce(false)
        const element = parseNodes('<div> <div></div> </div>')[0] as Element
        const [childElement] = element.children

        const match = children(matcher)
        const result = match.call(context, element)

        expect(result).toBe(false)
        expect(matcher).toBeCalledWith(childElement)
      })
    })
  })
})
