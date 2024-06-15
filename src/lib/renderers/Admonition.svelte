<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Html from './HTML.svelte'
  import Title from './Title.svelte'

  export let node: AbstractBlock

  const attrs = node.getAttributes()
  const doc = node.getDocument()
  const content = node.getContent() || ''
</script>

<div class={`admonitionblock ${attrs.name}`} {...getLineNumber(node)}>
  <table>
    <tbody>
      <tr>
        <td class="icon">
          {#if doc.hasAttribute('icons')}
            {#if doc.getAttribute('icons') === 'font' && !attrs.icon}
              <i class={`fa icon-${attrs.name}`} title={attrs.textlabel} />
            {:else}
              <img src={node.getIconUri(attrs.name)} alt={attrs.textlabel} />
            {/if}
          {:else}
            <div class="title">{node.getAttribute('textlabel')}</div>
          {/if}
        </td>
        <td class="content">
          <Title {node} />
          <Html raw={content} />
        </td>
      </tr>
    </tbody>
  </table>
</div>
