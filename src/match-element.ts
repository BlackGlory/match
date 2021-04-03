import { isDocument } from 'extra-dom'
import { IMatcher, SemanticMatcher, IContext } from './types'
import { matchOneByOne } from './match-one-by-one'

export function matchElement(
  this: void | Document
, element: Element
, ...matchers: Array<IMatcher<Element> | SemanticMatcher<Element>>
): { [name: string]: Element | Element[] } | null {
  const results: { [name: string]: Element } = {}
  const document = isDocument(this) ? this : globalThis.document
  const context: IContext<Element> = { document, collection: results }
  const next = (element: Element) => element.nextElementSibling

  if (matchOneByOne(context, element, next, ...matchers)) {
    return results
  } else {
    return null
  }
}
