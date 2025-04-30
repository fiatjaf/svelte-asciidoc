<script lang="ts">
  import {getExtra} from '../lib/'

  interface Props {
    attrs: {[_: string]: string};
    children?: import('svelte').Snippet;
  }

  let { attrs, children }: Props = $props();

  const extra = getExtra()
</script>

{#if attrs.href.startsWith('nostr:')}
  <span style="background: red">
    [START NOSTR LINK with extra {extra}]<a href={attrs.href}>{@render children?.()}</a>[END
    NOSTR]
  </span>
{:else}
  <!-- svelte-ignore a11y_missing_attribute -->
  <a {...attrs}>{@render children?.()}</a>
{/if}
