import { parse } from 'extra-dom'
import { children } from '@matchers/children'
import { createContext } from '@test/utils'

describe('children(...matchers: Array<IMatcher<Element>>): INestedMatcher<Element>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const matcher = jest.fn().mockReturnValueOnce(true)
      const element = parse('<div> <div></div> </div>')[0] as Element
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
      const matcher = jest.fn().mockReturnValueOnce(false)
      const element = parse('<div> <div></div> </div>')[0] as Element
      const [childElement] = element.children

      const match = children(matcher)
      const result = match.call(context, element)

      expect(result).toBe(false)
      expect(matcher).toBeCalledWith(childElement)
    })
  })
})
