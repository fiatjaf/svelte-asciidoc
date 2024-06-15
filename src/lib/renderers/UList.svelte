<script lang="ts">
  import {type List} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'
  import Html from './HTML.svelte'
  import Block from '../Block.svelte'

  export let node: List

  const isChecklist = node.isOption('checklist')
</script>

<div
  id={node.getId()}
  class={`ulist ${node.getStyle()} ${getRole(node)} ${isChecklist ? 'checklist' : ''}`}
  {...getLineNumber(node)}
>
  <Title block={node} />
  <ul class={isChecklist ? 'checklist' : ''}>
    {#each node.getItems() as item}
      {#if isChecklist}
        <li id={item.getId()} class={getRole(node)}>
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
        <li id={item.getId()} class={getRole(node)}>
          <p>{@html item.getText()}</p>
          {#each item.getBlocks() as b}
            <Block node={b} />
          {/each}
        </li>
      {/if}
    {/each}
  </ul>
</div>
