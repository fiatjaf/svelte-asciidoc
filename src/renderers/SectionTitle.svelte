<script lang="ts">
  import {Section} from '@asciidoctor/core'

  import {getLineNumber} from '../utils'

  export let section: Section
  export let level: number
  export let sectNum: string

  const docAttrs = section.getDocument().getAttributes()
  const sectNumLevels = docAttrs['sectnumlevels']
    ? parseInt(docAttrs['sectnumlevels'])
    : 3

  let title: string
  if (section.getCaption()) {
    title = section.getCaptionedTitle()
  } else if (section.isNumbered() && level <= sectNumLevels) {
    // todo: investigate sectnumlevels overrides not working
    if (level < 2 && section.getDocument().getDoctype() == 'book') {
      const sectionName = section.getSectionName()
      if (sectionName === 'chapter') {
        const signifier = docAttrs['chapter-signifier']
        title = `${signifier || ''} ${sectNum} ${section.getTitle()}`
      } else if (sectionName === 'part') {
        const signifier = docAttrs['part-signifier']
        title = `${signifier || ''} ${sectNum} ${section.getTitle()}`
      } else {
        title = `${sectNum} ${section.getTitle()}`
      }
    } else {
      title = `${sectNum} ${section.getTitle()}`
    }
  } else {
    title = section.getTitle() || ''
  }
</script>

{#if docAttrs.sectlinks}
  <!-- svelte-ignore a11y-missing-content -->
  <a class="anchor" id={section.getId() || ''} {...getLineNumber(section)} />
  <a class="link" href={`#${section.getId()}`}>{@html title}</a>
{:else}
  {title}
{/if}
