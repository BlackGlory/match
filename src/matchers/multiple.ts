import { IMatcher } from '@src/types'

export function multiple<T extends Node>(
  number: number
, matcher: IMatcher<T>
): NumberMultipleMatcher<T>
export function multiple<T extends Node>(
  range: [min: number, max: number]
, matcher: IMatcher<T>
): RangeMultipleMatcher<T>
export function multiple<T extends Node>(...args:
| [number: number, matcher: IMatcher<T>]
| [range: [min: number, max: number], matcher: IMatcher<T>]
): NumberMultipleMatcher<T> | RangeMultipleMatcher<T> {
  if (Array.isArray(args[0])) {
    const [range, matcher] = args
    return new RangeMultipleMatcher(range, matcher)
  } else {
    const [number, matcher] = args
    return new NumberMultipleMatcher(number, matcher)
  }
}

export class NumberMultipleMatcher<T extends Node> {
  constructor(
    public number: number
  , public matcher: IMatcher<T>
  ) {}
}

export class RangeMultipleMatcher<T extends Node> {
  constructor(
    public range: [min: number, max: number]
  , public matcher: IMatcher<T>) {}
}

export enum Range {
  Min = 0
, Max = 1
}
