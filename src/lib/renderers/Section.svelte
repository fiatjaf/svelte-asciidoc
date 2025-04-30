<script lang="ts">
  import {type Section} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import SectionTitle from './SectionTitle.svelte'
  import Block from '../Block.svelte'

  export interface Props {
    node: Section
  }

  let {node}: Props = $props()

  const level = node.getLevel()

  // svelte-ignore non_reactive_update
  let sectNum = node.getSectionNumeral()
  sectNum = sectNum === '.' ? '' : sectNum
</script>

{#if level === 0}
  <h1
    class={`sect0 ${getRole(node)}`}
    data-sectnum={sectNum}
    {...getLineNumber(node)}
  >
    <SectionTitle {node} {level} {sectNum} />
  </h1>
  {#each node.getBlocks() as b}
    <Block node={b} />
  {/each}
{:else}
  <div class={`sect${level} ${getRole(node)}`} {...getLineNumber(node)}>
    <svelte:element this={`h${level + 1}`} data-sectnum={sectNum}>
      <SectionTitle {node} {level} {sectNum} />
    </svelte:element>
    <div class="nodebody">
      {#each node.getBlocks() as b}
        <Block node={b} />
      {/each}
    </div>
  </div>
{/if}
