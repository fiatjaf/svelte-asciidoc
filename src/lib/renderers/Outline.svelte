<script lang="ts">
  import Outline from './Outline.svelte'
  import {type AbstractBlock, type Section} from '@asciidoctor/core'

  import Html from './HTML.svelte'

  export interface Props {
    node: AbstractBlock
    sectNumLevelsAttr?: string
    tocLevelsAttr?: string
  }

  let {node, sectNumLevelsAttr, tocLevelsAttr}: Props = $props()
  let doc = $derived(node.getDocument())
  let sections = $derived(node.getSections())
  let docAttrs = $derived(doc.getAttributes())

  const sectNumLevels = $derived(
    parseInt(
      sectNumLevelsAttr ? sectNumLevelsAttr : doc.getAttribute('sectnumlevels')
    ) || 3
  )
  const tocLevels = $derived(
    parseInt(
      tocLevelsAttr ? tocLevelsAttr : doc.getAttribute('sectnumlevels')
    ) || 2
  )

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
          <Outline
            node={section}
            tocLevelsAttr={tocLevels.toString()}
            sectNumLevelsAttr={sectNumLevels.toString()}
          />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
