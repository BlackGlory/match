import { IMatcher, IContext } from './types'
import { _match } from './_match'

export function matchOneByOne<T extends Node>(
  context: IContext<T>
, source: T
, next: (node: T) => T | null
, ...matchers: Array<IMatcher<T>>
): boolean {
  let currentNode: T | null = source
  for (const matcher of matchers) {
    if (!currentNode) return false

    const result = _match(context, currentNode, matcher)
    if (isBoolean(result)) {
      if (result) {
        currentNode = next(currentNode)
      } else {
        return false
      }
    } else {
      const iter = result()
      currentNode = next(currentNode)
      iter.next()
    }
  }

  return true
}

function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}
