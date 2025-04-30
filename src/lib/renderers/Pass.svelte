<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'
  import Html from './HTML.svelte'

  export interface Props {
    node: AbstractBlock;
  }

  let { node }: Props = $props();
</script>

<Html raw={node.getContent() || ''} />
