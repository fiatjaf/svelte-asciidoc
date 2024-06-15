<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import {getRole} from '../utils'

  import Html from './HTML.svelte'
  import Outline from './Outline.svelte'

  export let node: AbstractBlock

  const idAttr: string = node.getId() || 'toc'

  $: doc = node.getDocument()
  $: tocPlacement = doc.getAttribute('toc-placement')
  $: hasToc = doc.hasAttribute('toc')
  $: title = node.hasTitle() ? node.getTitle() : doc.getAttribute('toc-title')

  const levels = node.hasAttribute('levels')
    ? parseInt(node.getAttribute('levels'))
    : undefined
</script>

{#if tocPlacement === 'macro' && doc.hasSections() && hasToc}
  <div id={idAttr} class={`toc ${getRole(node)}`}>
    <div id={`${idAttr}title`} class="title">
      <Html raw={title || ''} />
    </div>
    <Outline node={doc} tocLevels={levels} />
  </div>
{/if}
