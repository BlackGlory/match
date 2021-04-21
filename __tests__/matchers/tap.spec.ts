import { parse } from 'extra-dom'
import { tap } from '@matchers/tap'
import { createContext } from '@test/utils'

describe(`
  tap<T extends Node, U extends IMatcher<T>>(
    matcher: U
  , callback: (value: ReturnType<U>) => void
  ): U
`, () => {
  it('returns the result of the matcher', () => {
    const context = createContext()
    const value = false
    const matcher = jest.fn().mockReturnValue(value)
    const callback = jest.fn(x => x)
    const node = parse('<div></div>')[0] as Element

    const match = tap(matcher, callback)
    // @ts-ignore
    const result = match.call(context, node)

    expect(result).toBe(value)
    expect(matcher).toBeCalledWith(node)
    expect(callback).toBeCalledWith(value)
  })
})
