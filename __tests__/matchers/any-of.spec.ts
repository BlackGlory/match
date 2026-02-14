import { describe, it, expect, vi } from 'vitest'
import { parseNodes } from 'extra-dom'
import { anyOf } from '@matchers/any-of.js'
import { createContext } from '@test/utils.js'

describe('anyOf', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      const matcher1 = vi.fn().mockReturnValue(false)
      const matcher2 = vi.fn().mockReturnValue(true)
      const matcher3 = vi.fn().mockReturnValue(false)
      const node = parseNodes('test')[0]

      const match = anyOf(matcher1, matcher2, matcher3)
      const result = match.call(context, node)

      expect(result).toBe(true)
      expect(matcher1).toBeCalledWith(node)
      expect(matcher2).toBeCalledWith(node)
      expect(matcher3).not.toBeCalled()
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      const matcher1 = vi.fn().mockReturnValue(false)
      const matcher2 = vi.fn().mockReturnValue(false)
      const node = parseNodes('test')[0]

      const match = anyOf(matcher1, matcher2)
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
