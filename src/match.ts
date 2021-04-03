import { isDocument } from 'extra-dom'
import { IMatcher, SemanticMatcher, IContext } from './types'
import { matchOneByOne } from './match-one-by-one'

export function match(
  this: void | Document
, node: Node
, ...matchers: Array<IMatcher<Node> | SemanticMatcher<Node>>
): { [name: string]: Node | Node[] } | null {
  const results: { [name: string]: Node } = {}
  const document = isDocument(this) ? this : globalThis.document
  const context: IContext<Node> = { document, collection: results }
  const next = (node: Node) => node.nextSibling

  if (matchOneByOne(context, node, next, ...matchers)) {
    return results
  } else {
    return null
  }
}
