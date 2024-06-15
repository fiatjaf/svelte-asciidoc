import Audio from './Audio.svelte'
import Video from './Video.svelte'
import Preamble from './Preamble.svelte'
import Section from './Section.svelte'
import Paragraph from './Paragraph.svelte'
import DList from './DList.svelte'
import UList from './UList.svelte'
import FloatingTitle from './FloatingTitle.svelte'
import Admonition from './Admonition.svelte'
import Listing from './Listing.svelte'
import Literal from './Literal.svelte'
import Image from './Image.svelte'
import CoList from './CoList.svelte'
import OList from './OList.svelte'
import Table from './Table.svelte'
import ThematicBreak from './ThematicBreak.svelte'
import Open from './Open.svelte'
import Pass from './Pass.svelte'
import PageBreak from './PageBreak.svelte'
import Example from './Example.svelte'
import Sidebar from './Sidebar.svelte'
import Quote from './Quote.svelte'
import Verse from './Verse.svelte'
import TableOfContents from './TableOfContents.svelte'

export type Renderers = typeof defaultRenderers

export const defaultRenderers = {
  audio: Audio,
  video: Video,
  preamble: Preamble,
  section: Section,
  paragraph: Paragraph,
  dlist: DList,
  ulist: UList,
  floating_title: FloatingTitle,
  admonition: Admonition,
  listing: Listing,
  literal: Literal,
  image: Image,
  colist: CoList,
  olist: OList,
  table: Table,
  thematic_break: ThematicBreak,
  open: Open,
  pass: Pass,
  page_break: PageBreak,
  example: Example,
  sidebar: Sidebar,
  quote: Quote,
  verse: Verse,
  toc: TableOfContents
}
