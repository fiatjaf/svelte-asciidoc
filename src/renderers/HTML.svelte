<script lang="ts">
  export let raw: string | undefined
</script>

{#if raw}
  {@html raw}
{/if}
