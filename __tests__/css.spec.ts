import { parse } from 'extra-dom'
import { css } from '@matchers/css'
import { createContext } from '@test/utils'

describe('css(selector: string): ITerminalMatcher<Element>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const node = parse('<div id="test"></div>')[0] as Element

      const match = css('#test')
      const result = match.call(context, node)

      expect(result).toBe(true)
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('<div></div>')[0] as Element

      const match = css('#test')
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
