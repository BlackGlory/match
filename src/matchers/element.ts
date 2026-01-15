import { isntElement } from 'extra-dom'
import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types.js'
import { isArray, isString } from '@blackglory/prelude'
import { concat } from 'extra-tags'
import { mergeInPlace } from '@utils/merge-in-place.js'

export function element(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>) => INestedMatcher<Node>
export function element(name: string, ...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
export function element(...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
export function element(...args:
| [strings: TemplateStringsArray, ...values: string[]]
| [name: string, ...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]
| [...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]
) {
  if (isArray(args[0])) {
    const [strings, ...values] =
      args as [strings: TemplateStringsArray, ...values: string[]]
    const name = concat(strings, ...values)

    return (...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>) => element(name, ...matchers)
  }

  if (isString(args[0])) {
    const [name, ...matchers] =
      args as [name: string, ...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]

    return function (this: IReadonlyContext, _element: Element) {
      const result = element(...matchers).call(this, _element)
      if (result) {
        mergeInPlace(this.collection, { [name]: _element })
      }
      return result
    }
  }

  const [...matchers] = args as [...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>]

  return function (this: IReadonlyContext, element: Element) {
    if (isntElement(element)) return false
    if (matchers.length === 0) return true

    return matchers.every(match => match.call(this, element))
  }
}
