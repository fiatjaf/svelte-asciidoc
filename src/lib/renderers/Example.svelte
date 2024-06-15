<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Block from '../Block.svelte'

  import {getLineNumber, getRole} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'
  import Html from './HTML.svelte'

  export let node: AbstractBlock

  const isCollapsible = node.isOption('collapsible')
  const title = node.getTitle() || 'Details'
  const isOpen = node.isOption('open') ? true : undefined
</script>

{#if isCollapsible}
  <details
    id={node.getId()}
    class={getRole(node)}
    open={isOpen}
    {...getLineNumber(node)}
  >
    <summary class="title">
      <Html raw={title} />
    </summary>
    <div class="content">
      {#each node.getBlocks() as b}
        <Block node={b} />
      {/each}
    </div>
  </details>
{:else}
  <div
    id={node.getId()}
    class={`exampleblock ${getRole(node)}`}
    {...getLineNumber(node)}
  >
    <CaptionedTitle {node} />
    <div class="content">
      {#each node.getBlocks() as b}
        <Block node={b} />
      {/each}
    </div>
  </div>
{/if}
