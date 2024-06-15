<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Block from '../Block.svelte'
  import Title from './Title.svelte'

  export let node: AbstractBlock
</script>

<div class={`sidebarblock ${getRole(node)}`} {...getLineNumber(node)}>
  <div class="content">
    <Title {node} />
    {#each node.getBlocks() as b}
      <Block node={b} />
    {/each}
  </div>
</div>
