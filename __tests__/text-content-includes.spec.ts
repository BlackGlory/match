import { parse } from 'extra-dom'
import { textContentIncludes } from '@matchers/text-content-includes'
import { createContext } from '@test/utils'

describe('textContentIncludes(text: string): ITerminalMatcher<Node>', () => {
  describe('caseSensitive = true', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const root = parse('<div> test </div>')[0] as Element

        const match = textContentIncludes('test')
        const result = match.call(context, root)

        expect(result).toBe(true)
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const root = parse('<div> TEST </div>')[0] as Element

        const match = textContentIncludes('test')
        const result = match.call(context, root)

        expect(result).toBe(false)
      })
    })
  })

  describe('caseSensitive = false', () => {
    describe('match', () => {
      it('return true', () => {
        const context = createContext()
        const root = parse('<div> TEST </div>')[0] as Element

        const match = textContentIncludes('test', { caseSensitive: false })
        const result = match.call(context, root)

        expect(result).toBe(true)
      })
    })

    describe('does not match', () => {
      it('return false', () => {
        const context = createContext()
        const root = parse('<div></div>')[0] as Element

        const match = textContentIncludes('test', { caseSensitive: false })
        const result = match.call(context, root)

        expect(result).toBe(false)
      })
    })
  })
})
