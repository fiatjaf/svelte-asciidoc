<script lang="ts">
  import {Block} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'

  export let block: Block

  const target = block.getAttribute('target')
</script>

<div
  class={`imageblock ${
    block.hasAttribute('align') ? 'text-' + block.getAttribute('align') : ''
  } ${block.hasAttribute('float') ? block.getAttribute('float') : ''} ${
    block.getRole() ? block.getRole() : ''
  }`}
  {...getLineNumber(block)}
  style:max-width={block.getAttribute('width')}
  style:max-height={block.getAttribute('height')}
>
  <div class="content">
    {#if block.hasAttribute('link')}
      <a class="image" href={block.getAttribute('link')}>
        <img
          src={block.getImageUri(target)}
          alt={block.getAttribute('alt')}
          width={block.getAttribute('width')}
          height={block.getAttribute('height')}
        />
      </a>
    {:else}
      <img
        src={block.getImageUri(target)}
        alt={block.getAttribute('alt')}
        width={block.getAttribute('width')}
        height={block.getAttribute('height')}
      />
    {/if}
  </div>
  <CaptionedTitle {block} />
</div>
