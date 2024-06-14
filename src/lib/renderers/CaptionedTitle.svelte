<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let block: AbstractBlock
</script>

{#if block.hasTitle()}
  <div class="title">
    <Html raw={block.getCaptionedTitle() || ''} />
  </div>
{/if}
