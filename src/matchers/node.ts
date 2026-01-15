import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types.js'
import { isArray, isString } from '@blackglory/prelude'
import { concat } from 'extra-tags'
import { mergeInPlace } from '@utils/merge-in-place.js'

export function node(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>) => INestedMatcher<Node>
export function node(
  name: string
, ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>
): INestedMatcher<Node>
export function node(
  ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>
): INestedMatcher<Node>
export function node(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string, ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>]
| [...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>]
) {
  if (isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, ...values)

    return (...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>) => node(name, ...matchers)
  }

  if (isString(args[0])) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>]

    return function (this: IReadonlyContext, _node: Node) {
      const result = node(...matchers).call(this, _node)
      if (result) {
        mergeInPlace(this.collection, { [name]: _node })
      }
      return result
    }
  }

  const [...matchers] = args as [...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>]

  return function (this: IReadonlyContext, node: Node) {
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(this, node))
  }
}
