import * as Query from '@blackglory/query'
import { ITerminalMatcher, IDocumentContext } from '@src/types'
import { isString } from '@blackglory/types'
import { concat } from '@utils/concat'

export function xpath(
  this: IDocumentContext<Node>
, experssion: string
): ITerminalMatcher<Node>
export function xpath(
  this: IDocumentContext<Node>
, strings: TemplateStringsArray
, ...values: string[]
): ITerminalMatcher<Node>
export function xpath(
  this: IDocumentContext<Node>
, ...args:
  | [expression: string]
  | [strings: TemplateStringsArray, ...values: string[]]
): ITerminalMatcher<Node> {
  if (isString(args[0])) {
    const [expression] = args
    const query = Query.xpath(expression)

    return function (this: IDocumentContext<Node>, node: Node): boolean {
      for (const queryResult of query.call(this.document, node)) {
        if (node === queryResult) return true
      }
      return false
    }
  } else {
    const [strings, ...values] = args
    const expression = concat(strings, values).join('')

    // @ts-ignore
    return xpath.call(this, expression)
  }
}
