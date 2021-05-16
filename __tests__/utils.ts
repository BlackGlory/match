import { IReadonlyContext } from '@src/types'
import { nextSibling } from 'extra-dom'

export function createContext(): IReadonlyContext {
  return {
    document
  , next: nextSibling
  , collection: {}
  }
}
