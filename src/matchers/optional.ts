import { IMatcher } from '@src/types'

export function optional<T extends Node>(matcher: IMatcher<T>): OptionalMatcher<T> {
  return new OptionalMatcher(matcher)
}

export class OptionalMatcher<T extends Node> {
  constructor(public matcher: IMatcher<T>) {}
}
