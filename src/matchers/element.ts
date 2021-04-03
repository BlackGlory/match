import { isntElement } from 'extra-dom'
import { INestedMatcher, IMatcher, IReadonlyContext } from '@src/types'
import { CollectMatcher } from './collect'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'

export function element(strings: TemplateStringsArray, ...values: string[]):
  (...matchers: Array<IMatcher<Element>>) => CollectMatcher<Element>
export function element(name: string):
  (...matchers: Array<IMatcher<Element>>) => CollectMatcher<Element>
export function element(name: string, ...matchers: Array<IMatcher<Element>>):
  CollectMatcher<Element>
export function element(...matchers: Array<IMatcher<Element>>):
  INestedMatcher<Node>
export function element(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string]
| [name: string, ...matchers: Array<IMatcher<Element>>]
| [...matchers: Array<IMatcher<Element>>]
) {
  if (Array.isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return element(name)
  }

  if (isString(args[0]) && args.length === 1) {
    const [name] = args as [name: string]

    return (...matchers: Array<IMatcher<Element>>) => element(name, ...matchers)
  }

  if (isString(args[0]) && args.length > 1) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<IMatcher<Element>>]

    return new CollectMatcher<Element>(name, element(...matchers))
  }

  const [...matchers] = args as [...matchers: Array<IMatcher<Element>>]

  return function (this: IReadonlyContext<Node>, node: Node) {
    if (isntElement(node)) return false
    if (matchers.length === 0) return true

    if (matchers.every(match => match.call(this as IReadonlyContext<Element>, node))) {
      return true
    } else {
      return false
    }
  }
}
