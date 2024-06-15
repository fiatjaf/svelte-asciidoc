<script lang="ts">
  import {type Renderers, defaultRenderers} from './renderers'

  export let node: any

  let type = node.getNodeName() as keyof Renderers
</script>

<svelte:component this={defaultRenderers[type]} {node} />
