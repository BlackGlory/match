import { isFunction } from '@blackglory/types'
import { merge } from '@utils/merge'
import { OptionalMatcher } from '@matchers/optional'
import { NumberMultipleMatcher, RangeMultipleMatcher, Range } from '@matchers/multiple'
import { CollectMatcher } from '@matchers/collect'
import { countup } from 'extra-generator'
import { IMatcher, IReadonlyContext, SemanticMatcher, MultipleMatcher } from './types'

export function _match<T extends Node>(
  context: IReadonlyContext<T>
, node: T
, matcher: IMatcher<T>
) {
  if (isFunction(matcher)) {
    if (!node) return false

    if (matcher.call(context, node)) {
      return true
    } else {
      return false
    }
  } else {
    return matchSemantic(context, node, matcher)
  }
}

function matchSemantic<T extends Node>(
  context: IReadonlyContext<T>
, node: T
, matcher: SemanticMatcher<T>
) {
  if (matcher instanceof OptionalMatcher) {
    if (node) {
      if (_match(context, node, matcher.matcher)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  } else if (matcher instanceof CollectMatcher) {
    if (_match(context, node, matcher.matcher)) {
      merge(context.collection, { [matcher.name]: node })
      return true
    } else {
      return false
    }
  } else {
    return matchMultiple(context, node, matcher)
  }
}

function matchMultiple<T extends Node>(
  context: IReadonlyContext<T>
, node: T
, matcher: MultipleMatcher<T>
): () => Generator<void, boolean, T> {
  if (matcher instanceof NumberMultipleMatcher) {
    return function* (): Generator<void, boolean, T> {
      for (const _ of countup(0, matcher.number)) {
        if (!node) return false

        if (_match(context, node, matcher.matcher)) {
          node = yield
        } else {
          return false
        }
      }

      return true
    }
  } else if (matcher instanceof RangeMultipleMatcher) {
    return function* (): Generator<void, boolean, T> {
      for (const num of countup(1, matcher.range[Range.Max])) {
        if (!node) {
          if (num < matcher.range[Range.Min]) {
            return false
          } else {
            break
          }
        }

        if (_match(context, node, matcher.matcher)) {
          node = yield
        } else {
          return false
        }
      }

      return true
    }
  } else {
    throw new Error('Unknown matcher')
  }
}
