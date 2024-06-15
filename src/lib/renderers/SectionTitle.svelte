<script lang="ts">
  import {type Section} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'

  export let node: Section
  export let level: number
  export let sectNum: string

  const docAttrs = node.getDocument().getAttributes()
  const sectNumLevels = docAttrs['sectnumlevels']
    ? parseInt(docAttrs['sectnumlevels'])
    : 3

  let title: string
  if (node.getCaption()) {
    title = node.getCaptionedTitle()
  } else if (node.isNumbered() && level <= sectNumLevels) {
    // todo: investigate sectnumlevels overrides not working
    if (level < 2 && node.getDocument().getDoctype() == 'book') {
      const nodeName = node.getSectionName()
      if (nodeName === 'chapter') {
        const signifier = docAttrs['chapter-signifier']
        title = `${signifier || ''} ${sectNum} ${node.getTitle()}`
      } else if (nodeName === 'part') {
        const signifier = docAttrs['part-signifier']
        title = `${signifier || ''} ${sectNum} ${node.getTitle()}`
      } else {
        title = `${sectNum} ${node.getTitle()}`
      }
    } else {
      title = `${sectNum} ${node.getTitle()}`
    }
  } else {
    title = node.getTitle() || ''
  }
</script>

{#if docAttrs.sectlinks}
  <!-- svelte-ignore a11y-missing-content -->
  <a class="anchor" id={node.getId() || ''} {...getLineNumber(node)} />
  <a class="link" href={`#${node.getId()}`}>{@html title}</a>
{:else}
  {title}
{/if}
