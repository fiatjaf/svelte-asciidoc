<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let block: AbstractBlock

  const attribution = block.getAttribute('attribution')
  const citetitle = block.getAttribute('citetitle')
  const content = block.getContent() || ''
</script>

<div
  id="block.getId()"
  class={`verseblock ${getRole(block)}`}
  {...getLineNumber(block)}
>
  <Title {block} />
  <pre class="content">{@html content}</pre>
  {#if attribution}
    <div class="attribution">
      — {attribution}
      {#if citetitle}
        <cite>{citetitle}</cite>
      {/if}
    </div>
  {/if}
</div>
