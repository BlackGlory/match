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
  describe('greedy = true', () => {
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
      , multiple([0, Infinity], element(css`br`), { greedy: true })
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
      , multiple([0, Infinity], element(css`br`), { greedy: true })
      , optional(element`footer`(css`footer`))
      )

      expect(result).toStrictEqual({ header, article, footer })
    })
  })

  describe('greedy = false', () => {
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

      const result = matchElement(header
      , element`header`(css`header`)
      , element`article`(css`article`)
      , multiple([0, Infinity], element(css`br`), { greedy: false })
      , optional(element`footer`(css`footer`))
      )

      // multiple使用非贪婪模式, 且min = 0, 因此直接匹配成功.
      // optional会匹配失败, 因为BR元素不满足css`footer`, 但optional的特性使它匹配成功.
      // 因此虽然匹配最终成功, 却无法收集到footer.
      expect(result).toStrictEqual({ header, article })
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
      , multiple([0, Infinity], element(css`br`), { greedy: false })
      , optional(element`footer`(css`footer`))
      )

      expect(result).toStrictEqual({ header, article, footer })
    })
  })
})
