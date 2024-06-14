<script lang="ts">
  import {createEventDispatcher} from 'svelte'
  import asciidoctor, {Document} from '@asciidoctor/core'

  import Block from './Block.svelte'
  import Outline from './renderers/Outline.svelte'
  import Html from './renderers/HTML.svelte'

  export let source: string

  const dispatch = createEventDispatcher()

  let doc: Document

  $: {
    doc = asciidoctor().load(source)
    dispatch('parsed', doc)
  }

  $: blocks = doc.getBlocks()
  $: footnotes = doc.getFootnotes()
  $: nofootnotes =
    blocks.length > 0 && blocks[0].getDocument().hasAttribute('nofootnotes')
  $: noheader = doc.getNoheader()
  $: hasheader = doc.hasHeader()
  $: toc =
    doc.hasSections() &&
    doc.hasAttribute('toc') &&
    doc.getAttribute('toc-placement') === 'auto'
  $: authors = doc.getAuthors()
  $: detail =
    authors.length > 0 ||
    doc.hasAttribute('revnumber') ||
    doc.hasAttribute('revdate') ||
    doc.hasAttribute('revremark')
</script>

{#if !noheader}
  <header id="header">
    {#if hasheader}
      <h1><Html raw={doc.getDocumentTitle()?.toString()} /></h1>
    {/if}
    {#if detail}
      <div class="details">
        {#each authors as author, index}
          {#if author.getName()}
            <span id={`author${index + 1 > 1 ? index + 1 : ''}`} class="author">
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
    {#if toc}
      <div id="toc" class={doc.getAttribute('toc-class', 'toc')}>
        <div id="toctitle">{doc.getAttribute('toc-title')}</div>
        <Outline block={doc} sectNumLevels={0} tocLevels={2} />
      </div>
    {/if}
  </header>
{/if}
{#each blocks as block}
  <Block {block} />
{/each}
{#if footnotes.length > 0 && !nofootnotes}
  <footer id="footnotes">
    <hr />
    {#each footnotes as footnote (footnote.getIndex())}
      <div class="footnote" id={`_footnoteef_${footnote.getIndex()}`}>
        {footnote.getText()}
      </div>
    {/each}
  </footer>
{/if}
