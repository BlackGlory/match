import { INestedMatcher, ITerminalMatcher, ISkipMatcher, IReadonlyContext } from '@src/types'
import { countup } from 'extra-generator'

export enum Range {
  Min = 0
, Max = 1
}

interface IMultipleOptions {
  // 当开启贪婪模式时, 应该优先匹配最长的情况
  greedy: boolean // = true, 默认启用贪婪模式
}

export function multiple<T extends Node>(
  number: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): ISkipMatcher<T>
export function multiple<T extends Node>(
  range: [min: number, max: number]
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options?:  IMultipleOptions
): ISkipMatcher<T>
export function multiple<T extends Node>(...args:
| [number: number, matcher: INestedMatcher<T> | ITerminalMatcher<T>]
| [
    range: [min: number, max: number]
  , matcher: INestedMatcher<T> | ITerminalMatcher<T>
  , options?: IMultipleOptions
  ]
): ISkipMatcher<T> {
  if (Array.isArray(args[0])) {
    const [[min, max], matcher, options = { greedy: true }] = args
    return function (this: IReadonlyContext, node: T) {
      if (options.greedy) {
        // @ts-ignore
        const round = matchMultiple.call(this, node, max, matcher)
        if (round >= min) {
          return round
        }
      } else {
        for (const ubound of countup(min, max)) {
          // @ts-ignore
          if (matchMultiple.call(this, node, ubound, matcher) === ubound) {
            return ubound
          }
        }
      }

      return false
    }
  } else {
    const [number, matcher] = args
    return function (this: IReadonlyContext, node: T) {
      // @ts-ignore
      if (matchMultiple.call(this, node, number, matcher) === number) {
        return number
      } else {
        return false
      }
    }
  }
}

/**
 *
 * @returns {number} 返回值为成功匹配的元素个数, 当此值等于ubound时, 代表匹配成功.
 */
function matchMultiple<T extends Node>(
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
