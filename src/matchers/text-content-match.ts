import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

export function textContentMatch(pattern: RegExp): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    return pattern.test(node.textContent)
  }
}
