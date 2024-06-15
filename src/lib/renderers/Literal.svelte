<script lang="ts">
  import {type Block} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Title from './Title.svelte'

  export let node: Block
  const docAttrs = node.getDocument().getAttributes()
  const nowrap = docAttrs['prewrap'] === undefined || node.isOption('nowrap')
</script>

<div class="literalblock" {...getLineNumber(node)}>
  <Title {node} />
  <div class="content">
    <pre class={nowrap ? 'nowrap' : ''}>{node.getSource()}</pre>
  </div>
</div>
