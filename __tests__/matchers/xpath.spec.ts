import { describe, it, expect } from 'vitest'
import { getBySelector } from 'extra-dom'
import { xpath } from '@matchers/xpath.js'
import { createContext } from '@test/utils.js'

describe('xpath', () => {
  describe('match', () => {
    it('return true', () => {
      const context = createContext()
      document.body.innerHTML = '<div id="test"></div>'
      const node = getBySelector('body > div')

      const match = xpath('//*[@id="test"]')
      const result = match.call(context, node)

      expect(result).toBe(true)
    })
  })

  describe('does not match', () => {
    it('return false', () => {
      const context = createContext()
      document.body.innerHTML = '<div></div>'
      const node = getBySelector('body > div')

      const match = xpath('//*[@id="test"]')
      const result = match.call(context, node)

      expect(result).toBe(false)
    })
  })
})
