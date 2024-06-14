<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Html from './HTML.svelte'

  export let block: AbstractBlock

  let level = block.getLevel()
</script>

<div class={`sectionanchor`} id={block.getId()} {...getLineNumber(block)}>
  <svelte:element
    this={`h${level + 1}`}
    class={`${getRole(block)} ${block.getStyle()}`}
  >
    <Html raw={block.getTitle() || ''} />
  </svelte:element>
</div>
