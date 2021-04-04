export interface IContext<T> {
  readonly document: Document
  readonly next: (node: T) => T | null
  readonly collection: {
    [name: string]: T | T[]
  }
}

export interface IReadonlyContext<T> {
  readonly document: Document
  readonly next: (node: T, distance?: number) => T | null
  readonly collection: {
    readonly [name: string]: T | T[]
  }
}

export type IDocumentContext<T> = Pick<IReadonlyContext<T>, 'document'>

export type IMatcher<T extends Node> =
| ITerminalMatcher<T>
| INestedMatcher<T>
| ISkipMatcher<T>

export type INestedMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => boolean

export type ISkipMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => number

export type ITerminalMatcher<T extends Node> = (
  this: IDocumentContext<T>
, node: T
) => boolean
