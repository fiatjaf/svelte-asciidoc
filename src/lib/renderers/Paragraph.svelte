<script lang="ts">
  import {type Block} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Html from './HTML.svelte'
  import Title from './Title.svelte'

  export interface Props {
    node: Block
  }

  let {node}: Props = $props()
</script>

<div
  id={node.getId()}
  class={`paragraph ${getRole(node)}`}
  {...getLineNumber(node)}
>
  <Title {node} />
  <p><Html raw={node.getContent()} /></p>
</div>
