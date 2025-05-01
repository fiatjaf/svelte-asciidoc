<script lang="ts">
  import asciidoctor, {type Document} from '@asciidoctor/core'

  import Block from './Block.svelte'
  import Outline from './renderers/Outline.svelte'
  import Html from './renderers/HTML.svelte'
  import type {Renderers, NaturalRenderers} from './renderers'
  import {setCustomRenderers, setNaturalRenderers, setExtra} from './'

  interface Props {
    source: string
    extra?: any
    customRenderers?: Partial<Renderers>
    naturalRenderers?: NaturalRenderers
    supportMarkdownTransition?: boolean
    onParsed?: (doc: Document) => void
  }

  let {
    source,
    extra = null,
    customRenderers = {},
    naturalRenderers = {},
    supportMarkdownTransition = false,
    onParsed
  }: Props = $props()

  setCustomRenderers(customRenderers)
  setNaturalRenderers(naturalRenderers)
  setExtra(extra)

  let doc = $state<Document>()
  let authors = $state<Document.Author[]>([])
  let footnotes = $state<Document.Footnote[]>([])

  $effect(() => {
    const Asciidoctor = asciidoctor()
    ;(Asciidoctor as any).Compliance.markdown_syntax = supportMarkdownTransition
    let parsed = Asciidoctor.load(source)
    onParsed?.(parsed)

    footnotes = parsed.getFootnotes()
    authors = parsed.getAuthors()
    doc = parsed
  })
</script>

{#if doc}
  {#if !doc.getNoheader()}
    <header id="header">
      {#if doc.hasHeader()}
        <h1><Html raw={doc.getDocumentTitle()?.toString()} /></h1>
      {/if}
      {#if authors.length > 0 || doc.hasAttribute('revnumber') || doc.hasAttribute('revdate') || doc.hasAttribute('revremark')}
        <div class="details">
          {#each authors as author, index}
            {#if author.getName()}
              <span
                id={`author${index + 1 > 1 ? index + 1 : ''}`}
                class="author"
              >
                {doc.applySubstitutions(author.getName() || '').toString()}
              </span>
              <br />
            {/if}
            {#if author.getEmail()}
              <span id={`email${index + 1 > 1 ? index + 1 : ''}`} class="email">
                {doc.applySubstitutions(author.getEmail() || '').toString()}
              </span>
              <br />
            {/if}
          {/each}
          {#if doc.hasAttribute('revnumber')}
            <span id="revnumber"
              >{`${doc
                .getAttribute('version-label')
                .toLowerCase()} ${doc.getAttribute('revnumber')}${
                doc.hasAttribute('revdate') ? ',' : ''
              }`}</span
            >
          {/if}
          {#if doc.hasAttribute('revdate')}
            <span id="revdate">{doc.getAttribute('revdate')}</span>
          {/if}
          {#if doc.hasAttribute('revremark')}
            <br />
            <span id="revremark">{doc.getAttribute('revremark')}</span>
          {/if}
        </div>
      {/if}
      {#if doc.hasSections() && doc.hasAttribute('toc') && doc.getAttribute('toc-placement') === 'auto'}
        <div id="toc" class={doc.getAttribute('toc-class', 'toc')}>
          <div id="toctitle">{doc.getAttribute('toc-title')}</div>
          <Outline node={doc} sectNumLevelsAttr="0" tocLevelsAttr="2" />
        </div>
      {/if}
    </header>
  {/if}
  {#each doc.getBlocks() as block}
    <Block node={block} />
  {/each}
  {#if footnotes.length > 0 && !(doc.getBlocks().length > 0 && doc
        .getBlocks()[0]
        .getDocument()
        .hasAttribute('nofootnotes'))}
    <footer id="footnotes">
      <hr />
      {#each footnotes as footnote (footnote.getIndex())}
        <div class="footnote" id={`_footnotedef_${footnote.getIndex()}`}>
          <a href={`#_footnoteref_${footnote.getIndex()}`}
            >{footnote.getIndex()}</a
          >.
          {footnote.getText()}
        </div>
      {/each}
    </footer>
  {/if}
{/if}
