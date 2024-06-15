<script lang="ts">
  import {type Block} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import CaptionedTitle from './CaptionedTitle.svelte'

  export let node: Block

  const target = node.getAttribute('target')
</script>

<div
  class={`imageblock ${
    node.hasAttribute('align') ? 'text-' + node.getAttribute('align') : ''
  } ${node.hasAttribute('float') ? node.getAttribute('float') : ''} ${
    node.getRole() ? node.getRole() : ''
  }`}
  {...getLineNumber(node)}
  style:max-width={node.getAttribute('width')}
  style:max-height={node.getAttribute('height')}
>
  <div class="content">
    {#if node.hasAttribute('link')}
      <a class="image" href={node.getAttribute('link')}>
        <img
          src={node.getImageUri(target)}
          alt={node.getAttribute('alt')}
          width={node.getAttribute('width')}
          height={node.getAttribute('height')}
        />
      </a>
    {:else}
      <img
        src={node.getImageUri(target)}
        alt={node.getAttribute('alt')}
        width={node.getAttribute('width')}
        height={node.getAttribute('height')}
      />
    {/if}
  </div>
  <CaptionedTitle {node} />
</div>
