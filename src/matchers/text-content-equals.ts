import { ITerminalMatcher } from '@src/types.js'
import { isNull } from '@blackglory/prelude'

interface ITextContentEqualsOptions {
  caseSensitive?: boolean
  trim?: boolean
}

export function textContentEquals(
  text: string
, {
    caseSensitive = true
  , trim = false
  }: ITextContentEqualsOptions = {}
): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    let textContent = node.textContent
    if (!caseSensitive) {
      textContent = textContent.toLowerCase()
      text = text.toLowerCase()
    }
    if (trim) textContent = textContent.trim()

    return textContent === text
  }
}
