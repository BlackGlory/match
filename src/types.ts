export interface IContext {
  readonly document: Document
  readonly next: (node: Node) => Node | null
  readonly collection: {
    [name: string]: Node | Node[]
  }
}

export interface IReadonlyContext {
  readonly document: Document
  readonly next: (node: Node, distance?: number) => Node | null
  readonly collection: {
    readonly [name: string]: Node | Node[]
  }
}

export type IMatcher<T extends Node> =
| ITerminalMatcher<T>
| INestedMatcher<T>
| ISkipMatcher<T>
| (
    <T extends Node>(this: IReadonlyContext, node: T) =>
      boolean | number | Iterable<number>
  )

export type INestedMatcher<T extends Node> = (
  this: IReadonlyContext
, node: T
) => boolean

export type ISkipMatcher<T extends Node> = (
  this: IReadonlyContext
, node: T
) => number | Iterable<number> | false

export type ITerminalMatcher<T extends Node> = (
  this: IReadonlyContext
, node: T
) => boolean
