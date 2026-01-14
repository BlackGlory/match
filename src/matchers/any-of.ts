import { ITerminalMatcher, INestedMatcher, IReadonlyContext } from '@src/types.js'

export function anyOf<T extends Node>(
  ...matchers: [
    INestedMatcher<T> | ITerminalMatcher<T>
  , INestedMatcher<T> | ITerminalMatcher<T>
  , ...Array<INestedMatcher<T> | ITerminalMatcher<T>>
  ]
): INestedMatcher<T> {
  return function (this: IReadonlyContext, node: T) {
    return matchers.some(match => match.call(this, node))
  }
}
