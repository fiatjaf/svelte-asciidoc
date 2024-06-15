<script lang="ts">
  import {type Renderers, defaultRenderers} from './renderers'
  import Unsupported from './renderers/Unsupported.svelte'

  export let node: any

  const type = node.getNodeName() as keyof Renderers
  const component = defaultRenderers[type] || Unsupported
</script>

<svelte:component this={component} {node} />
