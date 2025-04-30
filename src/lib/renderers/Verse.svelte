<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Html from './HTML.svelte'
  import Title from './Title.svelte'

  export interface Props {
    node: AbstractBlock;
  }

  let { node }: Props = $props();

  const attribution = node.getAttribute('attribution')
  const citetitle = node.getAttribute('citetitle')
  const content = node.getContent() || ''
</script>

<div
  id={node.getId()}
  class={`verseblock ${getRole(node)}`}
  {...getLineNumber(node)}
>
  <Title {node} />
  <pre class="content"><Html raw={content} /></pre>
  {#if attribution}
    <div class="attribution">
      — {attribution}
      {#if citetitle}
        <cite>{citetitle}</cite>
      {/if}
    </div>
  {/if}
</div>
