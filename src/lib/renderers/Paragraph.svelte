<script lang="ts">
  import {type Block} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let node: Block
</script>

<div
  id={node.getId()}
  class={`paragraph ${getRole(node)}`}
  {...getLineNumber(node)}
>
  <Title {node} />
  <p>{@html node.getContent()}</p>
</div>
