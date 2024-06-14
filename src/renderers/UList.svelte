<script lang="ts">
  import {List} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'
  import Html from './HTML.svelte'
  import Block from 'src/Block.svelte'

  export let list: List

  const isChecklist = list.isOption('checklist')
</script>

<div
  id={list.getId()}
  class={`ulist ${list.getStyle()} ${getRole(list)} ${isChecklist ? 'checklist' : ''}`}
  {...getLineNumber(list)}
>
  <Title block={list} />
  <ul class={isChecklist ? 'checklist' : ''}>
    {#each list.getItems() as item}
      {#if isChecklist}
        <li id={item.getId()} class={getRole(list)}>
          <p>
            {#if item.hasAttribute('checkbox')}
              <i
                class={`fa ${item.hasAttribute('checked') ? 'fa-check-square-o' : 'fa-square-o'}`}
              />
            {/if}
            {' '}
            <Html raw={item.getText()} />
          </p>
        </li>
      {:else}
        <li id={item.getId()} class={getRole(list)}>
          <p>{@html item.getText()}</p>
          {#each item.getBlocks() as b}
            <Block block={b} />
          {/each}
        </li>
      {/if}
    {/each}
  </ul>
</div>
