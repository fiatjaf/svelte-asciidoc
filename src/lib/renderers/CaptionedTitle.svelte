<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let node: AbstractBlock
</script>

{#if node.hasTitle()}
  <div class="title">
    <Html raw={node.getCaptionedTitle() || ''} />
  </div>
{/if}
