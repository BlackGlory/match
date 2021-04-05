import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

interface ITextContentIncludesOptions {
  caseSensitive?: boolean
  trim?: boolean
}

export function textContentIncludes(
  searchString: string
, {
    caseSensitive = true
  , trim = false
  }: ITextContentIncludesOptions = {}
): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    let textContent = node.textContent
    if (!caseSensitive) {
      textContent = textContent.toLowerCase()
      searchString = searchString.toLowerCase()
    }
    if (trim) textContent = textContent.trim()

    return textContent.includes(searchString)
  }
}
