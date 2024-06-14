<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Block from 'src/Block.svelte'

  import {getLineNumber, getRole} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'
  import Html from './HTML.svelte'

  export let block: AbstractBlock

  const isCollapsible = block.isOption('collapsible')
  const title = block.getTitle() || 'Details'
  const isOpen = block.isOption('open') ? true : undefined
</script>

{#if isCollapsible}
  <details
    id={block.getId()}
    class={getRole(block)}
    open={isOpen}
    {...getLineNumber(block)}
  >
    <summary class="title">
      <Html raw={title} />
    </summary>
    <div class="content">
      {#each block.getBlocks() as b}
        <Block block={b} />
      {/each}
    </div>
  </details>
{:else}
  <div
    id={block.getId()}
    class={`exampleblock ${getRole(block)}`}
    {...getLineNumber(block)}
  >
    <CaptionedTitle {block} />
    <div class="content">
      {#each block.getBlocks() as b}
        <Block block={b} />
      {/each}
    </div>
  </div>
{/if}
