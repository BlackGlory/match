import { isntElement } from 'extra-dom'
import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'
import { merge } from '@utils/merge'

export function element(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>) => INestedMatcher<Node>
export function element(name: string):
  (...matchers: Array<INestedMatcher<Element>>) => INestedMatcher<Node>
export function element(name: string, ...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
export function element(...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
export function element(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string]
| [name: string, ...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]
| [...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]
) {
  if (Array.isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, values).join('')

    return element(name)
  }

  if (isString(args[0]) && args.length === 1) {
    const [name] = args as [name: string]

    return (...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Node>>) => element(name, ...matchers)
  }

  if (isString(args[0]) && args.length > 1) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]

    return function (this: IReadonlyContext<Node>, _element: Element) {
      const result = element(...matchers).call(this, _element)
      if (result) {
        merge(this.collection, { [name]: _element })
      }
      return result
    }
  }

  const [...matchers] = args as [...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]

  return function (this: IReadonlyContext<Node>, element: Element) {
    if (isntElement(element)) return false
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(
      this as unknown as IReadonlyContext<Element>
    , element
    ))
  }
}
