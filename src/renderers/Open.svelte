<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Block from 'src/Block.svelte'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let block: AbstractBlock

  const style = block.getStyle()
</script>

{#if style === 'abstract'}
  <div
    class={`quoteblock abstract ${getRole(block)}`}
    {...getLineNumber(block)}
  >
    <Title {block} />
    <blockquote class="content">
      {#each block.getBlocks() as b}
        <Block block={b} />
      {/each}
    </blockquote>
  </div>
{:else}
  <div
    class={`openblock ${style && style !== 'open' ? style : ''} ${getRole(block)}`}
    {...getLineNumber(block)}
  >
    <Title {block} />
    <div class="content">
      {#each block.getBlocks() as b}
        <Block block={b} />
      {/each}
    </div>
  </div>
{/if}
