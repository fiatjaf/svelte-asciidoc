<script lang="ts">
  import {List} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'
  import Html from './HTML.svelte'
  import Block from 'src/Block.svelte'

  export let list: List
</script>

<div
  class={`olist ${getRole(list)} ${list.getStyle()}`}
  {...getLineNumber(list)}
>
  <Title block={list} />
  <ol
    class={list.getStyle()}
    reversed={list.isOption('reversed')}
    start={list.getAttribute('start')}
  >
    {#each list.getItems() as item}
      <li class={getRole(list) || ''}>
        <p><Html raw={item.getText()} /></p>
        {#each item.getBlocks() as b}
          <Block block={b} />
        {/each}
      </li>
    {/each}
  </ol>
</div>
