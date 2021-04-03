import { INestedMatcher } from '@src/types'

export class CollectMatcher<T extends Node> {
  constructor(public name: string, public matcher: INestedMatcher<T>) {}
}
