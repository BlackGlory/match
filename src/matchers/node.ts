import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'
import { merge } from '@utils/merge'

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
  if (Array.isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return (...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>) => node(name, ...matchers)
  }

  if (isString(args[0])) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>]

    return function (this: IReadonlyContext, _node: Node) {
      const result = node(...matchers).call(this, _node)
      if (result) {
        merge(this.collection, { [name]: _node })
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
