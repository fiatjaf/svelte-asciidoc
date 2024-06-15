<script lang="ts">
  import {type INode, type ITag, parse} from 'html5parser'
  import {getNaturalRenderers} from '../'

  export let raw: string | undefined | INode[]

  const ast = Array.isArray(raw) ? raw : parse(raw || '')
  const overrides = getNaturalRenderers()

  function gatherAttributes(node: ITag) {
    let attr: {[_: string]: string} = {}
    for (let i = 0; i < node.attributes.length; i++) {
      let {name, value} = node.attributes[i]
      if (name && value) {
        attr[name.value] = value.value
      }
    }
    return attr
  }
</script>

{#each ast as node}
  {#if node.type === 'Text'}
    {node.value}
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
