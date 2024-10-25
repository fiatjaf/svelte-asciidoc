<script lang="ts">
  import {type INode, type ITag, parse} from 'html5parser'
  import {getNaturalRenderers} from '../'

  export let raw: string | undefined | INode[]

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

  const ure = /&gt;|&lt;|&amp;|&#8217;|&#8230;&#8203;/g
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
      <svelte:component
        this={overrides[node.name]}
        attrs={gatherAttributes(node)}
        ><svelte:self raw={node.body} /></svelte:component
      >
    {:else}
      <svelte:element this={node.name} {...gatherAttributes(node)}
        ><svelte:self raw={node.body} /></svelte:element
      >
    {/if}
  {/if}
{/each}
