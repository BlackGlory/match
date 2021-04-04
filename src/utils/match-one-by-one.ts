import { IMatcher, IReadonlyContext } from '@src/types'
import { isBoolean } from '@blackglory/types'

export function matchOneByOne<T extends Node>(
  context: IReadonlyContext
, source: T
, ...matchers: Array<IMatcher<T>>
): boolean {
  let currentNode: T | null = source
  for (const match of matchers) {
    if (!currentNode) return false

    // @ts-ignore
    const result = match.call(context, currentNode)
    if (isBoolean(result)) {
      if (result) {
        currentNode = context.next(currentNode) as T | null
      } else {
        return false
      }
    } else {
      const distance = result
      currentNode = context.next(currentNode, distance) as T | null
    }
  }

  return true
}
