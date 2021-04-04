import { INestedMatcher, ITerminalMatcher, ISkipMatcher } from '@src/types'
import { multiple } from './multiple'

interface IOptionalOptions {
  // 当开启贪婪模式时, 应该优先匹配最长的情况
  greedy: boolean // = true, 默认启用贪婪模式
}

export function optional<T extends Node>(
  matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options?: IOptionalOptions
): ISkipMatcher<T> {
  return multiple([0, 1], matcher, options)
}
