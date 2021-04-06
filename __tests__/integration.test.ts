import { parse, getBySelector, getAllBySelector } from 'extra-dom'
import { matchElement, element, css, childNodes, children, textNode, multiple, optional } from '@src/index'

test('collect nodes', () => {
  const root = parse(`
    <div>
      <header>Heading</header>
      <article>
        <p>Paragraph1</p>
        <p>Paragraph2</p>
      </article>
    </div>
  `.trim())[0] as Element
  const header = getBySelector.call(root, 'header')
  const paragraphs = getAllBySelector.call(root, 'p')

  const result = matchElement(header
  , element(
      css`header`
    , childNodes(
        textNode`heading`()
      )
    )
  , element(
      css`article`
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

  expect(result).toStrictEqual({
    heading: header.childNodes[0]
  , paragraph: paragraphs.map(x => x.childNodes[0])
  })
})

test('optional', () => {
  const root = parse(`
    <div>
      <header>Header</header>
      <article>Article</article>
      <footer>Footer</footer>
    </div>
  `.trim())[0] as Element
  const header = getBySelector.call(root, 'header')
  const article = getBySelector.call(root, 'article')
  const footer = getBySelector.call(root, 'footer')

  const result = matchElement(header
  , element`header`(css`header`)
  , element`article`(css`article`)
  , optional(element`footer`(css`footer`))
  )

  expect(result).toStrictEqual({
    header
  , article
  , footer
  })
})

describe('multiple + optional', () => {
  test('br', () => {
    const root = parse(`
      <div>
        <header>Header</header>
        <article>Article</article>
        <br />
        <br />
        <footer>Footer</footer>
      </div>
    `.trim())[0] as Element
    const header = getBySelector.call(root, 'header')
    const article = getBySelector.call(root, 'article')
    const footer = getBySelector.call(root, 'footer')

    const result = matchElement(header
    , element`header`(css`header`)
    , element`article`(css`article`)
    , multiple([0, Infinity], element(css`br`))
    , optional(element`footer`(css`footer`))
    )

    expect(result).toStrictEqual({ header, article, footer })
  })

  test('no br', () => {
    const root = parse(`
      <div>
        <header>Header</header>
        <article>Article</article>
        <footer>Footer</footer>
      </div>
    `.trim())[0] as Element
    const header = getBySelector.call(root, 'header')
    const article = getBySelector.call(root, 'article')
    const footer = getBySelector.call(root, 'footer')

    const result = matchElement(header
    , element`header`(css`header`)
    , element`article`(css`article`)
    , multiple([0, Infinity], element(css`br`))
    , optional(element`footer`(css`footer`))
    )

    expect(result).toStrictEqual({ header, article, footer })
  })
})
