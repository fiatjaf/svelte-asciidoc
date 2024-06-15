<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Block from '../Block.svelte'
  import Title from './Title.svelte'

  export let node: AbstractBlock

  const style = node.getStyle()
</script>

{#if style === 'abstract'}
  <div class={`quoteblock abstract ${getRole(node)}`} {...getLineNumber(node)}>
    <Title {node} />
    <blockquote class="content">
      {#each node.getBlocks() as b}
        <Block node={b} />
      {/each}
    </blockquote>
  </div>
{:else}
  <div
    class={`openblock ${style && style !== 'open' ? style : ''} ${getRole(node)}`}
    {...getLineNumber(node)}
  >
    <Title {node} />
    <div class="content">
      {#each node.getBlocks() as b}
        <Block node={b} />
      {/each}
    </div>
  </div>
{/if}
