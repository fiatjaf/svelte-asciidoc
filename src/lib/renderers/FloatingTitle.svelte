<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Html from './HTML.svelte'

  export let node: AbstractBlock

  let level = node.getLevel()
</script>

<div class={`sectionanchor`} id={node.getId()} {...getLineNumber(node)}>
  <svelte:element
    this={`h${level + 1}`}
    class={`${getRole(node)} ${node.getStyle()}`}
  >
    <Html raw={node.getTitle() || ''} />
  </svelte:element>
</div>
