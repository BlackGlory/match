import { parse } from 'extra-dom'
import { textContentEquals } from '@matchers/text-content-equals'
import { createContext } from '@test/utils'

describe('textContentEquals(text: string, options: ITextContentEqualsOptions): ITerminalMatcher<Node>', () => {
  describe('trim', () => {
    describe('trim = true', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parse('<div> test </div>')[0] as Element

          const match = textContentEquals('test', { trim: true })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parse('<div> TEST </div>')[0] as Element

          const match = textContentEquals('test', { trim: true })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })

    describe('trim = false', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parse('<div>test</div>')[0] as Element

          const match = textContentEquals('test', { trim: false })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parse('<div> test </div>')[0] as Element

          const match = textContentEquals('test', { trim: false })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })
  })

  describe('caseSenstive', () => {
    describe('caseSenstive = true', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parse('<div>test</div>')[0] as Element

          const match = textContentEquals('test', { caseSensitive: true })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parse('<div>TEST</div>')[0] as Element

          const match = textContentEquals('test', { caseSensitive: true })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })

    describe('caseSensitive = false', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parse('<div>TEST</div>')[0] as Element

          const match = textContentEquals('test', { caseSensitive: false })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parse('<div> TEST </div>')[0] as Element

          const match = textContentEquals('test', { caseSensitive: false })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })
  })
})
