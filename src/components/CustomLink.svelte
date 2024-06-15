<script lang="ts">
  import {getExtra} from '../lib/'

  export let attrs: {[_: string]: string}

  let extra = getExtra()
</script>

{#if attrs.href.startsWith('nostr:')}
  <span style="background: red">
    [START NOSTR LINK with extra {extra}]<a href={attrs.href}><slot /></a>[END
    NOSTR]
  </span>
{:else}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a {...attrs}><slot /></a>
{/if}
