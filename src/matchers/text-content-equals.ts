import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

export function textContentEquals(text: string): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    return node.textContent === text
  }
}
