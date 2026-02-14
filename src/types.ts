import { Arrayable } from '@blackglory/prelude'

export interface IContext {
  readonly document: Document
  readonly next: (node: Node, distance?: number) => Node | undefined
  readonly collection: {
    [name: string]: Arrayable<Node>
  }
}

export interface IReadonlyContext {
  readonly document: Document
  readonly next: (node: Node, distance?: number) => Node | undefined
  readonly collection: {
    readonly [name: string]: Arrayable<Node>
  }
}

export type IMatcher<T extends Node> =
| ITerminalMatcher<T>
| INestedMatcher<T>
| ISkipMatcher<T>
| (
    <T extends Node>(
      this: IReadonlyContext, node: T
    ) => boolean | number | Iterable<number>
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
