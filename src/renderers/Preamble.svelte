<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Block from 'src/Block.svelte'
  import Outline from './Outline.svelte'
  import Html from './HTML.svelte'

  export let block: AbstractBlock

  const doc = block.getDocument()
  const hasToc =
    doc.getAttribute('toc-placement') === 'preamble' &&
    doc.hasSections() &&
    doc.hasAttribute('toc')
</script>

<div id="preamble" {...getLineNumber(block)}>
  <div class="sectionbody">
    {#each block.getBlocks() as b}
      <Block block={b} />
    {/each}
    {#if hasToc}
      <div id="toc" class={doc.getAttribute('toc-class', 'toc')}>
        <div id="toctitle"><Html raw={doc.getAttribute('toc-title')} /></div>
        <Outline block={doc} />
      </div>
    {/if}
  </div>
</div>
