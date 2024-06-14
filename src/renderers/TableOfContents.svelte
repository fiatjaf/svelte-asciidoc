<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import {getRole} from 'src/utils'

  import Html from './HTML.svelte'
  import Outline from './Outline.svelte'

  export let block: AbstractBlock

  let idAttr: string = block.getId() || 'toc'

  $: doc = block.getDocument()
  $: tocPlacement = doc.getAttribute('toc-placement')
  $: hasToc = doc.hasAttribute('toc')
  $: title = block.hasTitle() ? block.getTitle() : doc.getAttribute('toc-title')

  const levels = block.hasAttribute('levels')
    ? parseInt(block.getAttribute('levels'))
    : undefined
</script>

{#if tocPlacement === 'macro' && doc.hasSections() && hasToc}
  <div id={idAttr} class={`toc ${getRole(block)}`}>
    <div id={`${idAttr}title`} class="title">
      <Html raw={title || ''} />
    </div>
    <Outline block={doc} tocLevels={levels} />
  </div>
{/if}
