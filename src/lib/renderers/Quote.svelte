<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let node: AbstractBlock

  const attribution = node.getAttribute('attribution')
  const citetitle = node.getAttribute('citetitle')
  const content = node.getContent() || ''
</script>

<div
  id={node.getId()}
  class={`quoteblock ${getRole(node)}`}
  {...getLineNumber(node)}
>
  <Title {node} />
  <blockquote>{@html content}</blockquote>
  {#if attribution}
    <div class="attribution">
      — {attribution}
      {#if citetitle}
        <cite>{citetitle}</cite>
      {/if}
    </div>
  {/if}
</div>
