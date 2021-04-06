import * as ExtraDOM from 'extra-dom'

export function nextElementSibling(node: Node, distance: number = 1): Node | null {
  if (distance === 0) return node

  return ExtraDOM.nextElementSibling(node, distance)
}
