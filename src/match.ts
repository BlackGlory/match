import { isDocument } from 'extra-dom'
import { IMatcher, IContext } from './types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { nextSibling } from '@utils/next-sibling'

export function match(
  this: void | Document
, node: Node
, ...matchers: Array<IMatcher<Node>>
): { [name: string]: Node | Node[] } | null {
  const document = isDocument(this) ? this : globalThis.document
  const context: IContext = {
    document
  , collection: {}
  , next: nextSibling
  }

  if (matchOneByOne(context, node, ...matchers)) {
    return context.collection
  } else {
    return null
  }
}
