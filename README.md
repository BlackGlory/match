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
import { match, text, element, css, includesText, optional } from '@blackglory/match'

const nodes = match(root
  textNode(
    includeText('Reply to')
  )
, element(
    css`[title*="打开链接"]`
  , textContentIncludes('+')
  )
, element`target`(
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
  , textContentMatches(/\(\d{4}-\d{2}-\d{2} \d{2}:\d{2}\)/)
  )
, multiple([2, 10], element())
, optional(
    element(
      css`br`
    )
  )
)
```

## API

```ts
type IMatcher<T extends Node> =
| ITerminalMatcher<T>
| INestedMatcher<T>
| ISkipMatcher<T>

type ITerminalMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => boolean

type INestedMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => boolean

type ISkipMatcher<T extends Node> = (
  this: IReadonlyContext<T>
, node: T
) => number
```

### match

```ts
function match(
  this: void | Document
, node: Node
, ...matchers: Array<IMatcher<Node>>
): { [name: string]: Node | Node[] } | null
```

### matchElement

```ts
function matchElement(
  this: void | Document
, element: Element
, ...matchers: Array<IMatcher<Element>>
): { [name: string]: Element | Element[] } | null
```

### Matchers

#### anyOf

```ts
function anyOf<T extends Node>(
  ...matchers: [
    INestedMatcher<T> | ITerminalMatcher<T>
  , INestedMatcher<T> | ITerminalMatcher<T>
  , ...Array<INestedMatcher<T> | ITerminalMatcher<T>>
  ]
): INestedMatcher<T>
```

#### childNodes

```ts
function childNodes(...matchers: Array<IMatcher<Node>>): INestedMatcher<Node>
```

#### children

```ts
function children(...matchers: Array<IMatcher<Element>>): INestedMatcher<Element>
```

#### css

```ts
function css(strings: TemplateStringsArray, ...values: string[]): ITerminalMatcher<Element>
function css(selector: string): ITerminalMatcher<Element>
```

#### element

```ts
function element(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<INestedMatcher<Element> | ITerminalMatcher<Element>>) => INestedMatcher<Node>
function element(name: string, ...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
function element(...matchers: Array<INestedMatcher<Element>>):
  INestedMatcher<Node>
```

#### multiple

```ts
function multiple<T extends Node>(
  number: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): ISkipMatcher<T>
function multiple<T extends Node>(
  range: [min: number, max: number]
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options?:  IMultipleOptions
): ISkipMatcher<T>
```

#### node

```ts
function node(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>) => INestedMatcher<Node>
function node(
  name: string
, ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>
): INestedMatcher<Node>
function node(
  ...matchers: Array<INestedMatcher<Node> | ITerminalMatcher<Node>>
): INestedMatcher<Node>
```

#### optional

```ts
function optional<T extends Node>(
  matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options?: IOptionalOptions
): ISkipMatcher<T>
```

#### textContentEquals

```ts
interface ITextContentEqualsOptions {
  caseSensitive: boolean
}

function textContentEquals(
  text: string
, options: ITextContentEqualsOptions = { caseSensitive: true }
): ITerminalMatcher<Node>
```

#### textContentIncludes

```ts
interface ITextContentIncludesOptions {
  caseSensitive: boolean
}

function textContentIncludes(
  searchString: string
, options: ITextContentIncludesOptions = { caseSensitive: true }
): ITerminalMatcher<Node>
```

#### textContentMatches

```ts
function textContentMatches(pattern: RegExp): ITerminalMatcher<Node>
```

#### textNode

```ts
function textNode(
  strings: TemplateStringsArray
, ...values: string[]
): (...matchers: Array<ITerminalMatcher<Node>>) => INestedMatcher<Node>
function textNode(
  name: string
, ...matchers: Array<ITerminalMatcher<Node>>
): INestedMatcher<Node>
function textNode(
  ...matchers: Array<ITerminalMatcher<Node>>
): INestedMatcher<Node>
```

#### xpath

```ts
function xpath(
  strings: TemplateStringsArray
, ...values: string[]
): ITerminalMatcher<Node>
function xpath(experssion: string): ITerminalMatcher<Node>
```
