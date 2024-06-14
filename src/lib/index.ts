import {setContext} from 'svelte'
import SvelteAsciidoc from './SvelteAsciidoc.svelte'
import type {Renderers} from './renderers'

export default SvelteAsciidoc

const extraKey = Symbol('extrakey')
export function setExtra(extra: any) {
  setContext(extraKey, extra)
}

const customRenderersKey = Symbol('customRenderers')
export function setCustomRenderers(cr: Partial<Renderers>) {
  setContext(customRenderersKey, cr)
}
