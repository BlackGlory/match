import { INestedMatcher, IMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@src/match-one-by-one'

export function childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node> {
  return function (this: IReadonlyContext<Node>, node: Node) {
    if (node.childNodes.length === 0) {
      // 空matchers意味着"childNodes应该为空".
      if (matchers.length === 0) return true

      return false
    }

    return matchOneByOne(
      this
    , node.childNodes[0]
    , (node: Node) => node.nextSibling
    , ...matchers
    )
  }
}
