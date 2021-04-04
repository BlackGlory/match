import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

interface ITextContentEqualsOptions {
  caseSensitive: boolean
}

export function textContentEquals(
  text: string
, options: ITextContentEqualsOptions = { caseSensitive: true }
): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    if (options.caseSensitive) {
      return node.textContent === text
    } else {
      return node.textContent.toLowerCase() === text.toLowerCase()
    }
  }
}
