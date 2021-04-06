import { INestedMatcher, ITerminalMatcher, ISkipMatcher } from '@src/types'
import { multiple } from './multiple'

export function optional<T extends Node>(matcher: INestedMatcher<T> | ITerminalMatcher<T>): ISkipMatcher<T> {
  return multiple([0, 1], matcher, { greedy: true })
}
