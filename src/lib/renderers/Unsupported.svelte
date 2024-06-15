<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  export let node: AbstractBlock
</script>

<div class="unsupported">
  &lt;unsupported asciidoc directive '{node.getNodeName()}'&gt;
</div>
