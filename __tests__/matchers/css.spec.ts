import { describe, it, expect } from 'vitest'
import { parseNodes } from 'extra-dom'
import { css } from '@matchers/css.js'
import { createContext } from '@test/utils.js'

describe('css', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const node = parseNodes('<div id="test"></div>')[0] as Element

      const match = css('#test')
      const result = match.call(context, node)

      expect(result).toBe(true)
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const node = parseNodes('<div></div>')[0] as Element

      const match = css('#test')
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
