import { concat } from '@utils/concat'
import { ITerminalMatcher } from '@src/types'
import { isString } from '@blackglory/types'

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
    const selector = concat(strings, values).join('')

    return css(selector)
  }
}
