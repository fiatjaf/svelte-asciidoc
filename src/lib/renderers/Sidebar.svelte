<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Block from '../Block.svelte'
  import Title from './Title.svelte'

  export let node: AbstractBlock

  const blocks = node.getBlocks()
</script>

<div class={`sidebarblock ${getRole(node)}`} {...getLineNumber(node)}>
  <div class="content">
    <Title {node} />
    {#if blocks.length === 0}
      {@html node.getContent()}
    {:else}
      {#each blocks as b}
        <Block node={b} />
      {/each}
    {/if}
  </div>
</div>
