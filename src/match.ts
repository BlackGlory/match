import { isDocument } from 'extra-dom'
import { IMatcher, IContext } from './types.js'
import { matchOneByOne } from '@utils/match-one-by-one.js'
import { nextSibling } from '@utils/next-sibling.js'
import { Arrayable } from '@blackglory/prelude'

export function match(
  this: void | Document
, node: Node
, ...matchers: Array<IMatcher<Node>>
): Record<string, Arrayable<Node>> | null {
  const document = isDocument(this)
                 ? this
                 : globalThis.document

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
