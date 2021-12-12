import { IMatcher, INestedMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { mergeInPlace } from '@utils/merge-in-place'
import { nextElementSibling } from '@utils/next-element-sibling'

export function children(
  ...matchers: Array<IMatcher<Element>>
): INestedMatcher<Element> {
  return function (this: IReadonlyContext, element: Element) {
    // 空matchers意味着"children应该为空".
    if (matchers.length === 0) {
      return element.children.length === 0
    }

    if (element.children.length === 0) return false

    const context: IReadonlyContext = {
      ...this
    , collection: {}
    , next: nextElementSibling
    }

    const result = matchOneByOne(
      context
    , element.children[0]
    , ...matchers
    )

    if (result) {
      mergeInPlace(this.collection, context.collection)
    }

    return result
  }
}
