<script lang="ts">
  import {type List, type ListItem} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Html from './HTML.svelte'
  import Block from '../Block.svelte'
  import CaptionedTitle from './CaptionedTitle.svelte'

  export let node: List

  const style = node.getStyle()
  const itempairs = node.getItems() as any as [
    ListItem[],
    Pick<ListItem, 'hasText' | 'hasBlocks'> & {
      getNodeName: undefined | Function
    }
  ][]

  let labelWidth = node.getAttribute('labelwidth')
  labelWidth = labelWidth
    ? (labelWidth = `${labelWidth.replace('%', '')}%`)
    : ''

  let itemWidth = node.getAttribute('itemwidth')
  itemWidth = itemWidth ? `${itemWidth.replace('%', '')}%` : ''
</script>

<div {...getLineNumber(node)}></div>

{#if style === 'qanda'}
  <div class={`qlist qanda ${getRole(node)}`} {...getLineNumber(node)}>
    <CaptionedTitle {node} />
    <ol>
      {#each itempairs as item}
        <li>
          {#each item[0] as dt}
            <p>
              <em><Html raw={dt.getText()} /></em>
            </p>
          {/each}
          {#if item[1].getNodeName}
            <dd>
              {#if item[1].hasText()}
                <p><Html raw="getText(item[1])}" /></p>
              {/if}
              {#if item[1].hasBlocks()}
                {#each node.getBlocks() as b}
                  <Block node={b} />
                {/each}
              {/if}
            </dd>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
{:else if style === 'horizontal'}
  <div class={`hdlist ${getRole(node)}`}>
    <CaptionedTitle {node} />
    <table>
      {#if labelWidth || itemWidth}
        <colgroup>
          <col style:width={labelWidth} />
          <col style:width={itemWidth} />
        </colgroup>
      {/if}

      <tbody>
        {#each itempairs as item, index}
          <tr>
            <td class={`hdlist1 ${node.isOption('strong') ? 'strong' : ''}`}>
              {#each item[0] as dt}
                {#if index !== 0}
                  <br />
                {/if}
                <Html raw={dt.getText()} />
              {/each}
            </td>

            {#if item[1].getNodeName}
              <td class="hdlist2">
                {#if item[1].hasText()}
                  <p><Html raw="getText(item[1])}" /></p>
                {/if}
                {#if item[1].hasBlocks()}
                  {#each node.getBlocks() as b}
                    <Block node={b} />
                  {/each}
                {/if}
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class={`dlist ${node.getStyle()} ${getRole(node)}`}>
    <CaptionedTitle {node} />
    <dl>
      {#each itempairs as item}
        {#each item[0] as dt}
          <dt class="hdlist1">
            <Html raw={dt.getText()} />
          </dt>
        {/each}
        {#if item[1].getNodeName}
          <dd>
            {#if item[1].hasText()}
              <p><Html raw="getText(item[1])}" /></p>
            {/if}
            {#if item[1].hasBlocks()}
              {#each node.getBlocks() as b}
                <Block node={b} />
              {/each}
            {/if}
          </dd>
        {/if}
      {/each}
    </dl>
  </div>
{/if}
