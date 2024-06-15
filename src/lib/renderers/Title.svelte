<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let node: AbstractBlock
</script>

<div class="title">
  <Html raw={node.getTitle() || ''} />
</div>
