# match

A module for matching elements from pages.

## Install

```sh
npm install --save @blackglory/match
# or
yarn add @blackglory/match
```

## Usage

```ts
import { match, text, element, css, includesText, optional } from '@blackglory/query'

const nodes = match(
  textNode(
    includeText('Reply to')
  )
, element(
    css`[title*="打开链接"]`
  , textContentIncludes('+')
  )
, element`the element`(
    css`[title*="快速浏览"]`
  , textContentIncludes('R')
  , children(
      element(
        css`[title]`
      )
    )
  )
, textNode(
    textContentIncludes('by')
  )
, textNode(
    css`a`
  , includeText(/\(\d{4}-\d{2}-\d{2} \d{2}:\d{2}\)/)
  )
  // multiple需要处理范围内的每一种情况
, multiple([2, 10], element())
, optional(
    element(
      css`br`
    )
  )
)
```

## API

### match

```ts
function match<T extends Node>(
  this: void | Document
, cursor: Node
, ...matchers: [IMatcher<T>, ...Array<IMatcher<T>>]
): T[]
```

### Matchers
