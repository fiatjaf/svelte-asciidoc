<script lang="ts">
  import {type AbstractBlock, type Section} from '@asciidoctor/core'

  import Html from './HTML.svelte'

  export let node: AbstractBlock

  $: doc = node.getDocument()
  $: sections = node.getSections()
  $: docAttrs = doc.getAttributes()
  $: sectNumLevelsAttr = doc.getAttribute('sectnumlevels')
  $: tocLevelsAttr = doc.getAttribute('toclevels')

  export let sectNumLevels = sectNumLevelsAttr ? parseInt(sectNumLevelsAttr) : 3
  export let tocLevels = tocLevelsAttr ? parseInt(tocLevelsAttr) : 2

  function getTitle(section: Section & {$sectnum?: () => string}): string {
    let sectNum = section.$sectnum!()
    sectNum = sectNum === '.' || sectNum === '..' ? '' : sectNum
    const level = section.getLevel()

    if (section.getCaption()) {
      return section.getCaptionedTitle()
    } else if (level <= sectNumLevels) {
      // todo: investigate sectnumlevels overrides not working
      if (level < 2 && doc.getDoctype() == 'book') {
        const sectionName = section.getSectionName()
        if (sectionName === 'chapter') {
          const signifier = docAttrs['chapter-signifier']
          return `${signifier || ''} ${sectNum} ${section.getTitle()}`
        } else if (sectionName === 'part') {
          const signifier = docAttrs['part-signifier']
          return `${signifier || ''} ${sectNum} ${section.getTitle()}`
        } else {
          return `${sectNum} ${section.getTitle()}`
        }
      } else {
        return `${sectNum} ${section.getTitle()}`
      }
    } else {
      return section.getTitle() || ''
    }
  }
</script>

{#if node.hasSections()}
  <ul class={`sectlevel${sections[0].getLevel()}`}>
    {#each sections as section (section.getId())}
      <li>
        <a href={`#${section.getId()}`}>
          <Html raw={getTitle(section)} />
        </a>
        {#if section.getLevel() < tocLevels}
          <svelte:self node={section} {tocLevels} {sectNumLevels} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
