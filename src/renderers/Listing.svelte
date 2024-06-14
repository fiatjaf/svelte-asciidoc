<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'

  export let block: AbstractBlock
  const document = block.getDocument()
  const lang = block.getAttributes()?.language
  const nowrap = block.isOption('nowrap') || !document.hasAttribute('prewrap')
  const content = block.getContent() || ''
</script>

<div class="listingblock" {...getLineNumber(block)}>
  <CaptionedTitle {block} />
  <div class="content">
    <pre class={`highlight ${nowrap ? ' nowrap' : ''}`}>
            {#if lang}
        <code class={lang ? `language-${lang}` : ''} data-lang={lang}
          >{@html content}</code
        >
      {:else}
        <code>{@html content}</code>
      {/if}
          </pre>
  </div>
</div>
