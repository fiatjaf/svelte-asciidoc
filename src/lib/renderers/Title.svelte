<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  interface Props {
    node: AbstractBlock;
  }

  let { node }: Props = $props();
</script>

<div class="title">
  <Html raw={node.getTitle() || ''} />
</div>
