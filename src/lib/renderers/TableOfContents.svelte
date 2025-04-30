<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import {getRole} from '../utils'

  import Html from './HTML.svelte'
  import Outline from './Outline.svelte'

  export interface Props {
    node: AbstractBlock
  }

  let {node}: Props = $props()

  const idAttr: string = node.getId() || 'toc'

  let doc = $derived(node.getDocument())
  let tocPlacement = $derived(doc.getAttribute('toc-placement'))
  let hasToc = $derived(doc.hasAttribute('toc'))
  let title = $derived(
    node.hasTitle() ? node.getTitle() : doc.getAttribute('toc-title')
  )

  const levels = node.hasAttribute('levels')
    ? parseInt(node.getAttribute('levels'))
    : undefined
</script>

{#if tocPlacement === 'macro' && doc.hasSections() && hasToc}
  <div id={idAttr} class={`toc ${getRole(node)}`}>
    <div id={`${idAttr}title`} class="title">
      <Html raw={title || ''} />
    </div>
    <Outline node={doc} tocLevelsAttr={levels?.toString()} />
  </div>
{/if}
