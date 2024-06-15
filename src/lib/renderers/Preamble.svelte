<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Block from '../Block.svelte'
  import Outline from './Outline.svelte'
  import Html from './HTML.svelte'

  export let node: AbstractBlock

  const doc = node.getDocument()
  const hasToc =
    doc.getAttribute('toc-placement') === 'preamble' &&
    doc.hasSections() &&
    doc.hasAttribute('toc')
</script>

<div id="preamble" {...getLineNumber(node)}>
  <div class="sectionbody">
    {#each node.getBlocks() as b}
      <Block node={b} />
    {/each}
    {#if hasToc}
      <div id="toc" class={doc.getAttribute('toc-class', 'toc')}>
        <div id="toctitle"><Html raw={doc.getAttribute('toc-title')} /></div>
        <Outline node={doc} />
      </div>
    {/if}
  </div>
</div>
