<script lang="ts">
  import {type AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Title from './Title.svelte'

  export let node: AbstractBlock

  const startTime = node.getAttribute('start')
  const endTime = node.getAttribute('start')
  const timeAnchor =
    startTime || endTime
      ? `#t=${startTime || ''}` + endTime
        ? `,${endTime}`
        : ''
      : ''
</script>

<div class="audioblock" {...getLineNumber(node)}>
  <Title {node} />
  <div class="content">
    <audio
      src={`${node.getMediaUri(node.getAttribute('target'))}${timeAnchor}`}
      autoPlay={node.isOption('autoplay')}
      controls={!node.isOption('nocontrols')}
      loop={node.isOption('loop')}
    >
      Your browser does not support the audio tag.
    </audio>
  </div>
</div>
