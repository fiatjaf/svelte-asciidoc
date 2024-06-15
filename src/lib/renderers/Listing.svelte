<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'

  export let node: AbstractBlock
  const document = node.getDocument()
  const lang = node.getAttributes()?.language
  const nowrap = node.isOption('nowrap') || !document.hasAttribute('prewrap')
  const content = node.getContent() || ''
</script>

<div class="listingblock" {...getLineNumber(node)}>
  <CaptionedTitle {node} />
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
