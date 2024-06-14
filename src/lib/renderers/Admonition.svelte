<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Html from './HTML.svelte'
  import Title from './Title.svelte'

  export let block: AbstractBlock

  const attrs = block.getAttributes()
  const doc = block.getDocument()
  const content = block.getContent() || ''
</script>

<div class={`admonitionblock ${attrs.name}`} {...getLineNumber(block)}>
  <table>
    <tbody>
      <tr>
        <td class="icon">
          {#if doc.hasAttribute('icons')}
            {#if doc.getAttribute('icons') === 'font' && !attrs.icon}
              <i class={`fa icon-${attrs.name}`} title={attrs.textlabel} />
            {:else}
              <img src={block.getIconUri(attrs.name)} alt={attrs.textlabel} />
            {/if}
          {:else}
            <div class="title">{block.getAttribute('textlabel')}</div>
          {/if}
        </td>
        <td class="content">
          <Title {block} />
          <Html raw={content} />
        </td>
      </tr>
    </tbody>
  </table>
</div>
