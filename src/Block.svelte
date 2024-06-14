<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {Renderers, defaultRenderers} from './renderers'

  export let block: AbstractBlock

  let type = block.getNodeName() as keyof Renderers
</script>

<svelte:component this={defaultRenderers[type]} {block} />
