import { INestedMatcher, ITerminalMatcher, ISkipMatcher, IReadonlyContext } from '@src/types.js'
import { countup } from 'extra-generator'
import { assert } from '@blackglory/prelude'
import { matchMultiple } from '@utils/match-multiple.js'

export enum Range {
  Min = 0
, Max = 1
}

interface IMultipleOptions {
  // 当开启贪婪模式时, 应该优先匹配最长的情况
  greedy: boolean // = true, 默认启用贪婪模式
}

export function multiple<T extends Node>(
  [min, max]: [min: number, max: number]
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options: IMultipleOptions = { greedy: true }
): ISkipMatcher<T> {
  assert(Number.isInteger(min), 'parameter min must be an integer')
  assert(Number.isInteger(max) || max === Infinity, 'parameter max must be an integer or Infinity')
  assert(min >= 0, 'parameter min must be greater than or equal to 0')
  assert(min <= max, 'parameter max must be greater than or equal to min')

  return function* (this: IReadonlyContext, node: T) {
    if (options.greedy) {
      let ubound = max
      while (true) {
        const round = matchMultiple.call(
          this
        , node
        , ubound
        , matcher as INestedMatcher<Node> | ITerminalMatcher<Node>
        )

        if (round < min) break
        yield round

        ubound = round - 1
        if (ubound < min) break
      }
    } else {
      for (const ubound of countup(min, max)) {
        const result = matchMultiple.call(
          this
        , node
        , ubound
        , matcher as INestedMatcher<Node> | INestedMatcher<Node>
        )

        // 如果匹配的节点数量少于ubound, 说明匹配失败, 即使尝试更长的匹配也不会成功.
        if (result < ubound) break

        if (result === ubound) yield ubound
      }
    }
  }
}
