<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let block: AbstractBlock
</script>

<div class="title">
  <Html raw={block.getTitle() || ''} />
</div>
