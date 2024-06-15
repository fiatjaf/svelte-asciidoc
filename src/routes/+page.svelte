<script lang="ts">
  import {onMount} from 'svelte'
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
    source={`
= hello

this is text!footnote:[and this is footnote]

* seems to be working
** with nested lists
* _italic_ and *bold*

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

== now other stuff

=== links

literal link: https://nostr.org/

named link: https://nostr.org[works]

relative link? link:bla[works]

custom scheme link: link:nostr:nprofile1qqsrg73rwzgq6xd5u36kyg2ef69a5ur2uhrcthsfuk0yvp0ergplf8q8jdjnf[works]

=== description list

CPU:: The brain of the computer.
Hard drive:: Permanent storage for operating system and/or user files.
RAM:: Temporarily stores information the CPU uses during operation.
Keyboard:: Used to enter text or control items on the screen.
Mouse:: Used to point to and select items on your computer screen.
Monitor:: Displays information in visual form using text and graphics.

Dairy::
* Milk
* Eggs
Bakery::
* Bread
Produce::
* Bananas

Operating Systems::
  Linux:::
    . Fedora
      * Desktop
    . Ubuntu
      * Desktop
      * Server
  BSD:::
    . FreeBSD
    . NetBSD

Cloud Providers::
  PaaS:::
    . OpenShift
    . CloudBees
  IaaS:::
    . Amazon EC2
    . Rackspace

== audio and video

ok, this is getting ridiculous

video::https://cdn.satellite.earth/c66116e75e7c90225c1e825851558661e68e655567a024b2533bb622fdf74187.mp4[width=640,start=1,opts=autoplay]

audio::https://cdn.satellite.earth/22cb3b9f130de64291917da61271135021df63fab680fd742252a8d033dca31e.mp3[]
`}
  />
</main>

<style>
  main {
    width: 800px;
    margin: 20px auto;
  }
</style>
