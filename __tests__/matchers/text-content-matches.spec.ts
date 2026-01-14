import { describe, it, expect } from 'vitest'
import { parseNodes } from 'extra-dom'
import { textContentMatches } from '@matchers/text-content-matches.js'
import { createContext } from '@test/utils.js'

describe('textContentMatches(pattern: RegExp): ITerminalMatcher<Node>', () => {
  describe('trim', () => {
    describe('trim = true', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parseNodes('<div> test </div>')[0] as Element

          const match = textContentMatches(/^test$/, { trim: true })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parseNodes('<div> test </div>')[0] as Element

          const match = textContentMatches(/^ test $/, { trim: true })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })

    describe('trim = false', () => {
      describe('match', () => {
        it('return true', () => {
          const context = createContext()
          const node = parseNodes('<div>test</div>')[0] as Element

          const match = textContentMatches(/^test$/, { trim: false })
          const result = match.call(context, node)

          expect(result).toBe(true)
        })
      })

      describe('does not match', () => {
        it('return false', () => {
          const context = createContext()
          const node = parseNodes('<div>TEST</div>')[0] as Element

          const match = textContentMatches(/^test$/, { trim: false })
          const result = match.call(context, node)

          expect(result).toBe(false)
        })
      })
    })
  })
})
