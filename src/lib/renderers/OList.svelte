<script lang="ts">
  import {type List} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'
  import Html from './HTML.svelte'
  import Block from '../Block.svelte'

  export interface Props {
    node: List
  }

  let {node}: Props = $props()
</script>

<div
  class={`onode ${getRole(node)} ${node.getStyle()}`}
  {...getLineNumber(node)}
>
  <Title {node} />
  <ol
    class={node.getStyle()}
    reversed={node.isOption('reversed')}
    start={node.getAttribute('start')}
  >
    {#each node.getItems() as item}
      <li class={getRole(node) || ''}>
        <p><Html raw={item.getText()} /></p>
        {#each item.getBlocks() as b}
          <Block node={b} />
        {/each}
      </li>
    {/each}
  </ol>
</div>
