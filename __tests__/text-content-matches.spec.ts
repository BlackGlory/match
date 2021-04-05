import { parse } from 'extra-dom'
import { textContentMatches } from '@matchers/text-content-matches'
import { createContext } from '@test/utils'

describe('textContentMatches(pattern: RegExp): ITerminalMatcher<Node>', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const node = parse('<div>test</div>')[0] as Element

      const match = textContentMatches(/test/)
      const result = match.call(context, node)

      expect(result).toBe(true)
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const node = parse('<div>TEST</div>')[0] as Element

      const match = textContentMatches(/test/)
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
