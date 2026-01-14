import { IReadonlyContext, IMatcher } from '@src/types.js'

export function tap<T extends Node, U extends ReturnType<IMatcher<any>>>(
  matcher: (this: IReadonlyContext, node: T) => U
, callback: (value: U) => void
): (this: IReadonlyContext, node: T) => U {
  return function (this: IReadonlyContext, node: T) {
    const result = matcher.call(this, node)
    callback(result)
    return result
  }
}
