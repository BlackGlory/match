import { INestedMatcher, IMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { merge } from '@utils/merge'
import { nextSibling } from 'extra-dom'

export function childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node> {
  return function (this: IReadonlyContext, node: Node) {
    if (node.childNodes.length === 0) {
      // 空matchers意味着"childNodes应该为空".
      if (matchers.length === 0) return true

      return false
    }

    const context: IReadonlyContext = {
      ...this
    , collection: {}
    , next: nextSibling
    }

    const result = matchOneByOne(
      context
    , node.childNodes[0]
    , ...matchers
    )

    if (result) {
      merge(this.collection, context.collection)
    }

    return result
  }
}