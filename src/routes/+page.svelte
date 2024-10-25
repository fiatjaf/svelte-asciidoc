<script lang="ts">
  import {onMount} from 'svelte'
  import CustomLink from '../components/CustomLink.svelte'
  import SvelteAsciidoc from '../lib'

  onMount(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/asciidoctor.js/1.5.9/css/asciidoctor.min.css'
    document.head.appendChild(link)
  })
</script>

<main>
  <h1>svelte-asciidoc testing area</h1>

  <SvelteAsciidoc
    naturalRenderers={{a: CustomLink}}
    extra={837}
    source={`
= hello

this is text!footnote:[and this is footnote]

* seems to be working
** with nested lists
* _italic_ and *bold*
** and \`/<monospace>\`

[sidebar]
we have simple sidebar line

.and titled sidebar delimited block
****
Sidebars are used to visually separate auxiliary bits of content
that supplement the main text.

TIP: They can contain any type of content.

.Source code block in a sidebar
[source,js]
const { expect, expectCalledWith, heredoc } = require('../test/test-utils')
****

and image:

image::https://facts.net/wp-content/uploads/2020/08/AdobeStock_100020881.jpeg[llama, 200]

what else?

. ordered
. lists

== sub sections

with more text and super^script^?

CAUTION: we can~maybe~ even *have* \`formatting\` in admonition blocks

== tables

[cols="1,1"]
|===
|Cell in column 1, header row |Cell in column 2, header row

|Cell in column 1, row 2
|Cell in column 2, row 2

|something
d|whatever

a| link:nostr:npub1abc[this should be a red ugly mess]
a| **cra**zy \`content\` _allowed!_
|===

== now other stuff

=== description list

fruit:: banana
colors::
* black
* yellow
rank::
  for ice cream::: caturra
  for eating:::
    . prata
    . caturra
  for churras::: da terra

== audio and video

ok, this is getting ridiculous

video::https://cdn.satellite.earth/c66116e75e7c90225c1e825851558661e68e655567a024b2533bb622fdf74187.mp4[width=640,start=1,opts=autoplay]

audio::https://cdn.satellite.earth/22cb3b9f130de64291917da61271135021df63fab680fd742252a8d033dca31e.mp3[]

=== links

literal link: https://nostr.org/

named link: https://nostr.org[works]

relative link? link:bla[works]

custom scheme link: link:nostr:nprofile1qqsrg73rwzgq6xd5u36kyg2ef69a5ur2uhrcthsfuk0yvp0ergplf8q8jdjnf[works]

`}
  />
</main>

<style>
  main {
    width: 800px;
    margin: 20px auto;
  }
</style>
