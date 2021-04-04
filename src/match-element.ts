import { isDocument } from 'extra-dom'
import { IMatcher, IContext } from './types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { nextElementSibling } from 'extra-dom'

export function matchElement(
  this: void | Document
, element: Element
, ...matchers: Array<IMatcher<Element>>
): { [name: string]: Element | Element[] } | null {
  const document = isDocument(this) ? this : globalThis.document
  const context: IContext<Element> = {
    document
  , collection: {}
  , next: nextElementSibling
  }

  if (matchOneByOne(context, element, ...matchers)) {
    return context.collection
  } else {
    return null
  }
}
