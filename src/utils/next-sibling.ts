import * as ExtraDOM from 'extra-dom'

export function nextSibling(node: Node, distance: number = 1): Node | undefined {
  if (distance === 0) return node

  return ExtraDOM.nextSibling(node, distance)
}
