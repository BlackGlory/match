import { xpath } from '@matchers/xpath'
import { createContext } from '@test/utils'

describe('xpath(this: IDocumentContext<Node>, experssion: string): ITerminalMatcher<Node>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      document.body.innerHTML = '<div id="test"></div>'
      const node = document.querySelector('body > div')!

      const match = xpath('//*[@id="test"]')
      const result = match.call(context, node)

      expect(result).toBe(true)
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      document.body.innerHTML = '<div></div>'
      const node = document.querySelector('body > div')!

      const match = xpath('//*[@id="test"]')
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
