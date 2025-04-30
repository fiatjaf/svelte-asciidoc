<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  export interface Props {
    node: AbstractBlock;
  }

  let { node }: Props = $props();
</script>

<div class="unsupported">
  &lt;unsupported asciidoc directive '{node.getNodeName()}'&gt;
</div>
