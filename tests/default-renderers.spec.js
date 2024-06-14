import '@testing-library/jest-dom/extend-expect'
import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/svelte'
import SvelteAsciidoc from '../src/SvelteAsciidoc.svelte'

describe('testing default renderers', () => {
  test('renders a paragraph', () => {
    render(SvelteAsciidoc, {source: 'Plain text'})

    const element = screen.getByText('Plain text')
    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('<p>Plain text</p>')
  })

  test('renders emphasized paragraph', () => {
    render(SvelteAsciidoc, {source: '*Plain text*'})

    const element = screen.getByText('Plain text')
    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('<em>Plain text</em>')
  })

  test('renders strong paragraph', () => {
    render(SvelteAsciidoc, {source: '**Plain text**'})

    const element = screen.getByText('Plain text')
    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('<strong>Plain text</strong>')
  })

  test('renders a separator', () => {
    render(SvelteAsciidoc, {source: '---'})

    expect(document.getElementsByTagName('hr')[0]).toBeInTheDocument()
  })

  test('renders a blockquote', () => {
    render(SvelteAsciidoc, {source: '> Plain text'})

    const element = document.getElementsByTagName('blockquote')[0]
    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('<blockquote><p>Plain text</p></blockquote>')
  })

  describe('renders a link', () => {
    test('renders link title', () => {
      render(SvelteAsciidoc, {
        source: '[link](https://pablo.berganza.dev "link title")'
      })

      const element = screen.getByRole('link', {title: /link title/})
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent('link')
    })

    test('renders link name', () => {
      render(SvelteAsciidoc, {
        source: '[link](https://pablo.berganza.dev "link title")'
      })

      const element = screen.getByRole('link', {name: /link/})
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent('link')
    })
  })

  describe('heading', () => {
    test('renders a heading with id', () => {
      render(SvelteAsciidoc, {source: '# This is a title'})

      const element = screen.getByRole('heading', {name: /This is a title/})
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('id', 'this-is-a-title')
    })

    test('renders a heading (alternative syntax)', () => {
      render(SvelteAsciidoc, {source: 'This is a title\n==='})

      const element = screen.getByRole('heading', {name: /This is a title/})
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('id', 'this-is-a-title')
    })

    test('renders a heading with id and preffix', () => {
      render(SvelteAsciidoc, {
        source: '# This is a title',
        options: {headerPrefix: 'test-'}
      })

      const element = screen.getByRole('heading', {name: /This is a title/})
      expect(element).toHaveAttribute('id', 'test-this-is-a-title')
    })

    test('renders a heading with non-duplicate id', () => {
      render(SvelteAsciidoc, {
        source: '# This is a title\n\n## This is a title'
      })

      const element = screen.getAllByRole('heading', {
        name: /This is a title/
      })
      expect(element[0]).toHaveAttribute('id', 'this-is-a-title')
      expect(element[1]).toHaveAttribute('id', 'this-is-a-title-1')
    })

    test('renders a heading without id', () => {
      render(SvelteAsciidoc, {
        source: '# This is a title',
        options: {headerIds: false}
      })

      const element = screen.getByRole('heading', {name: /This is a title/})
      expect(element).not.toHaveAttribute('id')
    })
  })

  test('renders an image', () => {
    render(SvelteAsciidoc, {
      source:
        '![Image](https://pablo.berganza.dev/img/profile-pic-400.jpeg "image title")'
    })

    const element = screen.getByRole('img', {name: /Image/})
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('title', 'image title')
  })

  test('renders a table', () => {
    render(SvelteAsciidoc, {
      source: `
  | header |
  |--------|
  | value |`
    })

    const element = screen.getByRole('table')
    const tableHeaderElement = screen.getByRole('columnheader', {
      name: /header/
    })
    const tableCellElement = screen.getByRole('cell', {name: /value/})
    expect(element).toBeInTheDocument()
    expect(element).toContainElement(tableHeaderElement)
    expect(element).toContainElement(tableCellElement)
  })
})
