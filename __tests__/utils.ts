import { IReadonlyContext } from '@src/types'
import { nextSibling } from 'extra-dom'

export function createContext(): IReadonlyContext {
  return {
    document
  , next(node: Node, distance?: number): Node | null {
      return nextSibling(node, distance) ?? null
    }
  , collection: {}
  }
}
