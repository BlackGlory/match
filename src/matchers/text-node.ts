import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'
import { isntTextNode } from 'extra-dom'
import { merge } from '@utils/merge'

export function textNode(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<ITerminalMatcher<Node>>) => INestedMatcher<Node>
export function textNode(name: string): (...matchers: Array<ITerminalMatcher<Node>>) => INestedMatcher<Node>
export function textNode(
  name: string
, ...matchers: Array<ITerminalMatcher<Node>>
): INestedMatcher<Node>
export function textNode(
  ...matchers: Array<ITerminalMatcher<Element>>
): INestedMatcher<Node>
export function textNode(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string]
| [name: string, ...matchers: Array<ITerminalMatcher<Element>>]
| [...matchers: Array<ITerminalMatcher<Element>>]
) {
  if (Array.isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return textNode(name)
  }

  if (isString(args[0]) && args.length === 1) {
    const [name] = args as [name: string]

    return (...matchers: Array<ITerminalMatcher<Node>>) => textNode(name, ...matchers)
  }

  if (isString(args[0]) && args.length > 1) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<ITerminalMatcher<Node>>]

    return function (this: IReadonlyContext<Node>, node: Node) {
      const result = textNode(...matchers).call(this, node)
      if (result) {
        merge(this.collection, { [name]: node })
      }
      return result
    }
  }

  const [...matchers] = args as [...matchers: Array<ITerminalMatcher<Node>>]

  return function (this: IReadonlyContext<Node>, node: Node) {
    if (isntTextNode(node)) return false
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(this, node))
  }
}
