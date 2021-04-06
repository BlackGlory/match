import { countup } from 'extra-generator'
import { INestedMatcher, ITerminalMatcher, IReadonlyContext } from '@src/types'

/**
 * @returns {number} 返回值为成功匹配的元素个数, 当此值等于ubound时, 代表匹配成功.
 */
export function matchMultiple<T extends Node>(
  this: IReadonlyContext
, node: T
, ubound: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): number {
  let currentNode: T | null = node

  for (const round of countup(1, ubound)) {
    if (!currentNode) return round - 1

    const result = matcher.call(this, currentNode)
    if (result) {
      currentNode = this.next(currentNode) as T | null
    } else {
      return round - 1
    }
  }

  return ubound
}
