<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export let node: AbstractBlock
</script>

<Html raw={node.getContent() || ''} />
