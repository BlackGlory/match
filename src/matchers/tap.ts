import { IMatcher, IReadonlyContext } from '@src/types'

export function tap<T extends IMatcher<any>>(
  matcher: T
, callback: (value: number | boolean) => void
): T {
  return function (this: IReadonlyContext, node: T) {
    // @ts-ignore
    const result = matcher.call(this, node)
    callback(result)
    return result
  } as T
}
