<script lang="ts">
  import {type List} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Html from './HTML.svelte'
  import Block from '../Block.svelte'
  import Title from './Title.svelte'

  export interface Props {
    node: List
  }

  let {node}: Props = $props()
</script>

<div class="colist" {...getLineNumber(node)}>
  <Title {node} />
  <table>
    <tbody>
      {#each node.getItems() as item, index}
        <tr>
          <td>
            <i class="conum" data-value={index + 1}></i>
            <b>{index + 1}</b>
          </td>
          <td>
            <Html raw={item.getText()} />
            {#each item.getBlocks() as b}
              <Block node={b} />
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
