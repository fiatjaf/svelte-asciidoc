<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  export interface Props {
    node: AbstractBlock
  }

  let {node}: Props = $props()
</script>

<pre>{node.getContent() || ''}</pre>
