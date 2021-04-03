import { INestedMatcher, IMatcher, IReadonlyContext } from '@src/types'
import { CollectMatcher } from './collect'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'
import { isntTextNode } from 'extra-dom'

export function textNode(strings: TemplateStringsArray, ...values: string[]):
  (...matchers: Array<IMatcher<Node>>) => CollectMatcher<Node>
export function textNode(name: string):
  (...matchers: Array<IMatcher<Node>>) => CollectMatcher<Node>
export function textNode(name: string, ...matchers: Array<IMatcher<Node>>):
  CollectMatcher<Node>
export function textNode(...matchers: Array<IMatcher<Element>>):
  INestedMatcher<Node>
export function textNode(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string]
| [name: string, ...matchers: Array<IMatcher<Element>>]
| [...matchers: Array<IMatcher<Element>>]
) {
  if (Array.isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return textNode(name)
  }

  if (isString(args[0]) && args.length === 1) {
    const [name] = args as [name: string]

    return (...matchers: Array<IMatcher<Node>>) => textNode(name, ...matchers)
  }

  if (isString(args[0]) && args.length > 1) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<IMatcher<Node>>]

    return new CollectMatcher<Element>(name, textNode(...matchers))
  }

  const [...matchers] = args as [...matchers: Array<IMatcher<Node>>]

  return function (this: IReadonlyContext<Node>, node: Node) {
    if (isntTextNode(node)) return false
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(this, node))
  }
}
