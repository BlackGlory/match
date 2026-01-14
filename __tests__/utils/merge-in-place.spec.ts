import { describe, test, expect } from 'vitest'
import { mergeInPlace } from '@utils/merge-in-place.js'

describe('mergeInPlace', () => {
  test('new name', () => {
    const target = { hello: 'hello' }
    const source = { world: 'world' }

    mergeInPlace(target, source)

    expect(target).toStrictEqual({
      hello: 'hello'
    , world: 'world'
    })
  })

  test('same name', () => {
    const target = { text: 'hello' }
    const source = { text: 'world' }

    mergeInPlace(target, source)

    expect(target).toStrictEqual({
      text: ['hello', 'world']
    })
  })
})
