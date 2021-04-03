import { IMatcher, INestedMatcher, IReadonlyContext } from '@src/types'
import { _match } from '@src/_match'

export function anyOf<T extends Node>(
  ...matchers: [IMatcher<T>, IMatcher<T>, ...Array<IMatcher<T>>]
): INestedMatcher<T> {
  return function (this: IReadonlyContext<T>, node: T) {
    return matchers.some(match => _match.call(this, node, match))
  }
}
