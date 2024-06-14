<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let block: AbstractBlock
</script>

<Html raw={block.getContent() || ''} />
