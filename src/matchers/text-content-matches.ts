import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

interface ITextContentMatchesOptions {
  trim?: boolean
}

export function textContentMatches(
  pattern: RegExp
, { trim = false }: ITextContentMatchesOptions = {}
): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    let textContent = node.textContent
    if (trim) textContent = textContent.trim()

    return pattern.test(textContent)
  }
}
