<script lang="ts">
  import {AbstractBlock} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'
  import Title from './Title.svelte'

  export let block: AbstractBlock

  const startTime = block.getAttribute('start')
  const endTime = block.getAttribute('start')
  const timeAnchor =
    startTime || endTime
      ? `#t=${startTime || ''}` + endTime
        ? `,${endTime}`
        : ''
      : ''
</script>

<div class="audioblock" {...getLineNumber(block)}>
  <Title {block} />
  <div class="content">
    <audio
      src={`${block.getMediaUri(block.getAttribute('target'))}${timeAnchor}`}
      autoPlay={block.isOption('autoplay')}
      controls={!block.isOption('nocontrols')}
      loop={block.isOption('loop')}
    >
      Your browser does not support the audio tag.
    </audio>
  </div>
</div>
