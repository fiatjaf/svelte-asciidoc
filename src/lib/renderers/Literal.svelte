<script lang="ts">
  import {Block} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Title from './Title.svelte'

  export let block: Block
  const docAttrs = block.getDocument().getAttributes()
  const nowrap = docAttrs['prewrap'] === undefined || block.isOption('nowrap')
</script>

<div class="literalblock" {...getLineNumber(block)}>
  <Title {block} />
  <div class="content">
    <pre class={nowrap ? 'nowrap' : ''}>{block.getSource()}</pre>
  </div>
</div>
