export function merge<T>(
  target: { [key: string]: T | T[] }
, source: { [key: string]: T | T[] }
): void {
  for (const [key, value] of Object.entries(source)) {
    if (target[key]) {
      if (Array.isArray(target[key])) {
        if (Array.isArray(value)) {
          target[key] = [...target[key] as T[], ...value]
        } else {
          target[key] = [...target[key] as T[], value]
        }
      } else {
        if (Array.isArray(value)) {
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
