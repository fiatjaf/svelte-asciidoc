<script lang="ts">
  import {Block} from '@asciidoctor/core'

  import {getLineNumber, getRole} from '../utils'
  import Title from './Title.svelte'

  export let block: Block
</script>

<div
  id={block.getId()}
  class={`paragraph ${getRole(block)}`}
  {...getLineNumber(block)}
>
  <Title {block} />
  <p>{@html block.getContent()}</p>
</div>
