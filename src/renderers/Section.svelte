<script lang="ts">
  import {Section} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import SectionTitle from './SectionTitle.svelte'
  import Block from 'src/Block.svelte'

  export let section: Section

  const level = section.getLevel()

  let sectNum = section.getSectionNumeral()
  sectNum = sectNum === '.' ? '' : sectNum
</script>

{#if level === 0}
  <h1
    class={`sect0 ${getRole(section)}`}
    data-sectnum={sectNum}
    {...getLineNumber(section)}
  >
    <SectionTitle {section} {level} {sectNum} />
  </h1>
  {#each section.getBlocks() as b}
    <Block block={b} />
  {/each}
{:else}
  <div class={`sect${level} ${getRole(section)}`} {...getLineNumber(section)}>
    <svelte:element this={`h${level + 1}`} data-sectnum={sectNum}>
      <SectionTitle {section} {level} {sectNum} />
    </svelte:element>
    <div class="sectionbody">
      {#each section.getBlocks() as b}
        <Block block={b} />
      {/each}
    </div>
  </div>
{/if}
