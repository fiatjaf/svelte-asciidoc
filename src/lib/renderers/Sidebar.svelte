<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Block from 'src/Block.svelte'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let block: AbstractBlock
</script>

<div class={`sidebarblock ${getRole(block)}`} {...getLineNumber(block)}>
  <div class="content">
    <Title {block} />
    {#each block.getBlocks() as b}
      <Block block={b} />
    {/each}
  </div>
</div>
