import { INestedMatcher, IMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { mergeInPlace } from '@utils/merge-in-place'
import { nextSibling } from '@utils/next-sibling'

export function childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node> {
  return function (this: IReadonlyContext, node: Node) {
    // 空matchers意味着"childNodes应该为空".
    if (matchers.length === 0) {
      return node.childNodes.length === 0
    }

    if (node.childNodes.length === 0) return false

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
      mergeInPlace(this.collection, context.collection)
    }

    return result
  }
}
