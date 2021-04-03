import { NumberMultipleMatcher, RangeMultipleMatcher } from '@matchers/multiple'
import { OptionalMatcher } from '@matchers/optional'
import { CollectMatcher } from '@matchers/collect'

export interface IContext<T> {
  readonly document: Document
  readonly collection: {
    [name: string]: T | T[]
  }
}

export type IReadonlyContext<T> = {
  readonly document: Document
  readonly collection: {
    readonly [name: string]: T | T[]
  }
}

export type IDocumentContext<T> = Pick<IReadonlyContext<T>, 'document'>

export type IMatcher<T extends Node> =
| INestedMatcher<T>
| ITerminalMatcher<T>
| SemanticMatcher<T>

export type INestedMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => boolean

export type ITerminalMatcher<T extends Node> = (
  this: IDocumentContext<T>
, node: T
) => boolean

export type SemanticMatcher<T extends Node> =
| MultipleMatcher<T>
| OptionalMatcher<T>
| CollectMatcher<T>

export type MultipleMatcher<T extends Node> =
| NumberMultipleMatcher<T>
| RangeMultipleMatcher<T>
