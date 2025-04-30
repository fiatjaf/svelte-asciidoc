<script lang="ts">
  import HTML from './HTML.svelte'
  import {type INode, type ITag, parse} from 'html5parser'
  import {getNaturalRenderers} from '../'

  interface Props {
    raw: string | undefined | INode[]
  }

  let {raw}: Props = $props()

  const ast = Array.isArray(raw) ? raw : parse(raw || '')
  const overrides = getNaturalRenderers()

  function gatherAttributes(node: ITag) {
    const attr: {[_: string]: string} = {}
    for (let i = 0; i < node.attributes.length; i++) {
      const {name, value} = node.attributes[i]
      if (name && value) {
        attr[name.value] = value.value
      }
    }
    return attr
  }

  const ure = /&gt;|&lt;|&amp;|&#8217;|&#8230;&#8203;|&#8201;&#8212;&#8201;/g
  function unescape(text: string): string {
    return text.replace(ure, (v: string, ..._: any) => {
      switch (v) {
        case '&lt;':
          return '<'
        case '&gt;':
          return '>'
        case '&amp;':
          return '&'
        case '&#8217;':
          return "'"
        case '&#8201;&#8212;&#8201;':
          return '—'
        case '&#8230;&#8203;':
          return '…'
        default:
          return v
      }
    })
  }
</script>

{#each ast as node}
  {#if node.type === 'Text'}
    {unescape(node.value)}
  {:else if node.type === 'Tag'}
    {#if node.name in overrides}
      {@const Component = overrides[node.name]}
      <Component attrs={gatherAttributes(node)}
        ><HTML raw={node.body as any} /></Component
      >
    {:else}
      <svelte:element this={node.name} {...gatherAttributes(node)}
        ><HTML raw={node.body as any} /></svelte:element
      >
    {/if}
  {/if}
{/each}
