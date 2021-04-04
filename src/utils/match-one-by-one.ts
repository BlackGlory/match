import { IMatcher, IReadonlyContext } from '@src/types'
import { isBoolean } from '@blackglory/types'

export function matchOneByOne<T extends Node>(
  context: IReadonlyContext<T>
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
        currentNode = context.next(currentNode)
      } else {
        return false
      }
    } else {
      currentNode = context.next(currentNode, result)
    }
  }

  return true
}
