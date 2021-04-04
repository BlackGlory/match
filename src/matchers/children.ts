import { IMatcher, INestedMatcher, IReadonlyContext } from '@src/types'
import { matchOneByOne } from '@utils/match-one-by-one'
import { merge } from '@utils/merge'

export function children(
  ...matchers: Array<IMatcher<Element>>
): INestedMatcher<Element> {
  return function (this: IReadonlyContext<Element>, element: Element) {
    if (element.children.length === 0) {
      // 空matchers意味着"children应该为空".
      if (matchers.length === 0) return true

      return false
    }

    const context: IReadonlyContext<Element> = {
      ...this
    , collection: {}
    , next
    }

    const result = matchOneByOne(
      context
    , element.children[0]
    , ...matchers
    )

    if (result) {
      merge(this.collection, context.collection)
    }

    return result
  }
}

function next(element: Element): Element | null {
  return element.nextElementSibling
}
