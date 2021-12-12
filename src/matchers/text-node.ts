import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types'
import { isArray, isString } from '@blackglory/types'
import { concat } from '@utils/concat'
import { isntTextNode } from 'extra-dom'
import { merge } from '@utils/merge'

export function textNode(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<ITerminalMatcher<Node>>) => INestedMatcher<Node>
export function textNode(
  name: string
, ...matchers: Array<ITerminalMatcher<Node>>
): INestedMatcher<Node>
export function textNode(
  ...matchers: Array<ITerminalMatcher<Node>>
): INestedMatcher<Node>
export function textNode(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string, ...matchers: Array<ITerminalMatcher<Node>>]
| [...matchers: Array<ITerminalMatcher<Node>>]
) {
  if (isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return (...matchers: Array<ITerminalMatcher<Node>>) => textNode(name, ...matchers)
  }

  if (isString(args[0])) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<ITerminalMatcher<Node>>]

    return function (this: IReadonlyContext, node: Node) {
      const result = textNode(...matchers).call(this, node)
      if (result) {
        merge(this.collection, { [name]: node })
      }
      return result
    }
  }

  const [...matchers] = args as [...matchers: Array<ITerminalMatcher<Node>>]

  return function (this: IReadonlyContext, node: Node) {
    if (isntTextNode(node)) return false
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(this, node))
  }
}
