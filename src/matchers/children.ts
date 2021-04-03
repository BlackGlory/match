import { IMatcher, INestedMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@src/match-one-by-one'

export function children(
  ...matchers: Array<IMatcher<Element>>
): INestedMatcher<Element> {
  return function (this: IReadonlyContext<Element>, element: Element) {
    if (element.children.length === 0) {
      // 空matchers意味着"children应该为空".
      if (matchers.length === 0) return true

      return false
    }

    return matchOneByOne(
      this
    , element.children[0]
    , (element: Element) => element.nextElementSibling
    , ...matchers
    )
  }
}
