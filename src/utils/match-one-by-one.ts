import { IMatcher, IReadonlyContext } from '@src/types.js'
import { isBoolean, isNumber, isIterable, isEmptyArray } from '@blackglory/prelude'

export function matchOneByOne<T extends Node>(
  context: IReadonlyContext
, source: T | null
, ...matchers: Array<IMatcher<T>>
): boolean {
  if (isEmptyArray(matchers)) return true
  if (!source) return false

  const [matcher, ...otherMatchers] = matchers

  const result = Reflect.apply(matcher, context, [source]) as ReturnType<typeof matcher>

  // TerminalMatcher
  if (isBoolean(result)) {
    if (result) {
      const nextNode = context.next(source) as T | null
      return matchOneByOne(context, nextNode, ...otherMatchers)
    } else {
      return false
    }
  }

  // 此处一定是成功匹配, 因为SkipMatcher在失败时会返回false.
  if (isNumber(result)) {
    const distance = result
    const nextNode = context.next(source, distance) as T | null
    return matchOneByOne(context, nextNode, ...otherMatchers)
  }

  // SkipMatcher返回Iterable意味着存在多种可能性, 可能出现失败回溯.
  if (isIterable(result)) {
    for (const distance of result) {
      const nextNode = context.next(source, distance) as T | null
      if (matchOneByOne(context, nextNode, ...otherMatchers)) {
        return true
      }
    }

    // 尝试了所有可能性, 未发现可以匹配的结果
    return false
  }

  throw new Error('Unknown return value')
}
