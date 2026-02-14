import { Arrayable, isArray } from '@blackglory/prelude'

export function mergeInPlace<T>(
  target: Record<string, Arrayable<T>>
, source: Record<string, Arrayable<T>>
): void {
  for (const [key, value] of Object.entries(source)) {
    if (target[key]) {
      if (isArray(target[key])) {
        if (isArray(value)) {
          target[key] = [...target[key] as T[], ...value]
        } else {
          target[key] = [...target[key] as T[], value]
        }
      } else {
        if (isArray(value)) {
          target[key] = [target[key] as T, ...value]
        } else {
          target[key] = [target[key] as T, value]
        }
      }
    } else {
      target[key] = value
    }
  }
}
