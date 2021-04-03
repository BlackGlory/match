import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

export function textContentIncludes(searchString: string): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    return node.textContent.includes(searchString)
  }
}
