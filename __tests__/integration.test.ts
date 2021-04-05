import { parse, getBySelector, getAllBySelector } from 'extra-dom'
import { matchElement, element, css, childNodes, children, textNode, multiple } from '@src/index'

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

  const result = matchElement(header,
    element(
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
