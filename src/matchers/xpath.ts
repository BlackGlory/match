import { ITerminalMatcher, IReadonlyContext } from '@src/types.js'
import { isString } from '@blackglory/prelude'
import { concat } from '@utils/concat.js'
import { assert } from '@blackglory/prelude'

const UNORDERED_NODE_ITERATOR_TYPE =
  'XPathResult' in globalThis
  ? XPathResult.UNORDERED_NODE_ITERATOR_TYPE
  : 4

export function xpath(
  strings: TemplateStringsArray
, ...values: string[]
): ITerminalMatcher<Node>
export function xpath(
  experssion: string
): ITerminalMatcher<Node>
export function xpath(...args:
| [expression: string]
| [strings: TemplateStringsArray, ...values: string[]]
): ITerminalMatcher<Node> {
  if (isString(args[0])) {
    const [expression] = args
    assert(expression.startsWith('//*'), 'XPath expressions must start with "//*"')

    return function (
      this: Pick<IReadonlyContext, 'document'>
    , node: Node
    ): boolean {
      return xpathMatches(this.document, expression, node)
    }
  } else {
    const [strings, ...values] = args
    const expression = concat(strings, values).join('')

    return xpath(expression)
  }
}

function xpathMatches(document: Document, expression: string, node: Node): boolean {
  const iterator = document.evaluate(
    expression
  , node
  , null
  , UNORDERED_NODE_ITERATOR_TYPE
  , null
  )

  let value
  while ((value = iterator.iterateNext()) !== null) {
    if (value === node) return true
  }
  return false
}
