import { concat } from 'extra-tags'
import { ITerminalMatcher } from '@src/types.js'
import { isString } from '@blackglory/prelude'

export function css(
  strings: TemplateStringsArray
, ...values: string[]
): ITerminalMatcher<Element>
export function css(selector: string): ITerminalMatcher<Element>
export function css(...args:
| [selector: string]
| [strings: TemplateStringsArray, ...values: string[]]
): ITerminalMatcher<Element> {
  if (isString(args[0])) {
    const [selector] = args

    return (element: Element) => element.matches(selector)
  } else {
    const [strings, ...values] = args
    const selector = concat(strings, ...values)

    return css(selector)
  }
}
