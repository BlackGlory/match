import { parse } from 'extra-dom'
import { matchElement } from '@src/match-element'

describe(`
  match(
    this: void | Document
  , node: Element
  , ...matchers: Array<IMatcher<Element>>
  ): { [name: string]: Node | Node[] } | null
`, () => {
  describe('match', () => {
    it('return { [name: string]: Element | Element[] }', () => {
      const matcher1 = jest.fn().mockReturnValue(true)
      const matcher2 = jest.fn().mockReturnValue(true)
      const nodes = parse('<div></div> <div></div>')
      const element1 = nodes[0] as Element
      const element2 = nodes[2] as Element

      const result = matchElement(element1, matcher1, matcher2)

      expect(result).toBeTruthy()
      expect(matcher1).toBeCalledWith(element1)
      expect(matcher2).toBeCalledWith(element2)
    })
  })

  describe('does not match', () => {
    it('return null', () => {
      const matcher1 = jest.fn().mockReturnValue(false)
      const matcher2 = jest.fn().mockReturnValue(true)
      const [element] = parse('<div></div> <div></div>') as Element[]

      const result = matchElement(element, matcher1, matcher2)

      expect(result).toBe(null)
      expect(matcher1).toBeCalledWith(element)
      expect(matcher2).not.toBeCalled()
    })
  })
})
