import { INestedMatcher, ITerminalMatcher, ISkipMatcher, IReadonlyContext } from '@src/types'

export function optional<T extends Node>(matcher: INestedMatcher<T> | ITerminalMatcher<T>): ISkipMatcher<T> {
  return function (this: IReadonlyContext, node: T) {
    if (!node) return 0

    if (matcher.call(this, node)) {
      return 1
    } else {
      return 0
    }
  }
}
