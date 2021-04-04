import { INestedMatcher, ITerminalMatcher, ISkipMatcher, IReadonlyContext } from '@src/types'
import { countup, countdown } from 'extra-generator'

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
) {
  if (Array.isArray(args[0])) {
    const [[min, max], matcher, options = { greedy: true }] = args
    return function (this: IReadonlyContext<T>, node: T) {
      const iter = options.greedy
        ? countdown(max, min)
        : countup(min, max)

      for (const ubound of iter) {
        // @ts-ignore
        if (matchMultiple.call(this, node, ubound, matcher)) {
          return ubound
        }
      }

      return false
    }
  } else {
    const [number, matcher] = args
    return function (this: IReadonlyContext<T>, node: T) {
      // @ts-ignore
      if (matchMultiple.call(this, node, number, matcher)) {
        return number
      } else {
        return false
      }
    }
  }
}

function matchMultiple<T extends Node>(
  this: IReadonlyContext<T>
, node: T
, ubound: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): boolean {
  let currentNode: T | null = node

  for (const _ of countup(1, ubound)) {
    if (!currentNode) return false

    const result = matcher.call(this, currentNode)
    if (result) {
      currentNode = this.next(currentNode)
    } else {
      return false
    }
  }

  return true
}
