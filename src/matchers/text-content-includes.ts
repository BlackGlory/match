import { ITerminalMatcher } from '@src/types'
import { isNull } from '@blackglory/types'

interface ITextContentIncludesOptions {
  caseSensitive: boolean
}

export function textContentIncludes(
  searchString: string
, options: ITextContentIncludesOptions = { caseSensitive: true }
): ITerminalMatcher<Node> {
  return (node: Node) => {
    if (isNull(node.textContent)) return false

    if (options.caseSensitive) {
      return node.textContent.includes(searchString)
    } else {
      return node.textContent.toLowerCase().includes(searchString.toLowerCase())
    }
  }
}
