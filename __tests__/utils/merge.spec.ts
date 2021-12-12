import { mergeInPlace } from '@utils/merge-in-place'

describe(`
  mergeInPlace<T>(
    target: { [key: string]: T | T[] }
  , source: { [key: string]: T | T[] }
  ): void
`, () => {
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
