<script lang="ts">
  import {List} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Html from './HTML.svelte'
  import Block from 'src/Block.svelte'
  import Title from './Title.svelte'

  export let list: List
</script>

<div class="colist" {...getLineNumber(list)}>
  <Title block={list} />
  <table>
    <tbody>
      {#each list.getItems() as item, index}
        <tr>
          <td>
            <i class="conum" data-value={index + 1} />
            <b>{index + 1}</b>
          </td>
          <td>
            <Html raw={item.getText()} />
            {#each item.getBlocks() as b}
              <Block block={b} />
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
