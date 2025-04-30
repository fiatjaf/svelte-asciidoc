<script lang="ts">
  import {getCustomRenderers} from './'
  import {type Renderers, defaultRenderers} from './renderers'
  import Unsupported from './renderers/Unsupported.svelte'

  interface Props {
    node: any;
  }

  let { node }: Props = $props();

  const type = node.getNodeName() as keyof Renderers

  const overrides = getCustomRenderers()
  const component = overrides[type] || defaultRenderers[type] || Unsupported

  const SvelteComponent = $derived(component);
</script>

<SvelteComponent {node} />
