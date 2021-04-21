import { INestedMatcher, ITerminalMatcher, ISkipMatcher, IReadonlyContext } from '@src/types'
import { assert } from '@blackglory/errors'
import { matchMultiple } from '@utils/match-multiple'

export function repeat<T extends Node>(
  times: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): ISkipMatcher<T> {
  assert(Number.isInteger(times), 'parameter times must be an integer')
  assert(times >= 0, 'parameter number must be greater than or equal to 0')

  return function (this: IReadonlyContext, node: T) {
    const result = matchMultiple.call(
      this
    , node
    , times
    , matcher as INestedMatcher<Node> | ITerminalMatcher<Node>
    )
    if (result === times) {
      return times
    } else {
      return false
    }
  }
}
