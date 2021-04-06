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
import { matchElement, element, css, childNodes, textNode, children, multiple } from '@blackglory/match'

const result = matchElement(node
, element(
    css`header`
  , childNodes(
      textNode`heading`()
    )
  )
, element(
    css`section`
  , children(
      multiple([1, Infinity], element(
        css`p`
      , childNodes(
          textNode`paragraph`()
        )
      ))
    )
  )
)
// { heading: Text, paragraph: [ Text, Text ] }
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
) => number | false
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
): { [name: string]: Node | Node[] } | null
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
interface IMultipleOptions {
  greedy: boolean
}

function multiple<T extends Node>(
  range: [min: number, max: number]
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
, options:  IMultipleOptions = { greedy: true }
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
): ISkipMatcher<T>
```

#### repeat

```ts
function repeat<T extends Node>(
  times: number
, matcher: INestedMatcher<T> | ITerminalMatcher<T>
): ISkipMatcher<T>
```

#### tap

```ts
function tap<T extends IMatcher<any>>(
  matcher: T
, callback: (value: number | boolean) => void
): T
```

#### textContentEquals

```ts
interface ITextContentEqualsOptions {
  caseSensitive?: boolean
  trim?: boolean
}

function textContentEquals(
  text: string
, {
    caseSensitive = true
  , trim = false
  }: ITextContentEqualsOptions = {}
): ITerminalMatcher<Node>
```

#### textContentIncludes

```ts
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
): ITerminalMatcher<Node>
```

#### textContentMatches

```ts
interface ITextContentMatchesOptions {
  trim?: boolean
}

export function textContentMatches(
  pattern: RegExp
, { trim = false }: ITextContentMatchesOptions = {}
): ITerminalMatcher<Node>
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
