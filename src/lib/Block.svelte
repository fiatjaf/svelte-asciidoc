<script lang="ts">
  import {getCustomRenderers} from './'
  import {type Renderers, defaultRenderers} from './renderers'
  import Unsupported from './renderers/Unsupported.svelte'

  export let node: any

  const type = node.getNodeName() as keyof Renderers

  const overrides = getCustomRenderers()
  const component = overrides[type] || defaultRenderers[type] || Unsupported
</script>

<svelte:component this={component} {node} />
