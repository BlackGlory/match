import { merge } from '@utils/merge'

describe(`
  merge<T>(
    target: { [key: string]: T | T[] }
  , source: { [key: string]: T | T[] }
  ): void
`, () => {
  test('new name', () => {
    const target = { hello: 'hello' }
    const source = { world: 'world' }

    merge(target, source)

    expect(target).toStrictEqual({
      hello: 'hello'
    , world: 'world'
    })
  })

  test('same name', () => {
    const target = { text: 'hello' }
    const source = { text: 'world' }

    merge(target, source)

    expect(target).toStrictEqual({
      text: ['hello', 'world']
    })
  })
})
