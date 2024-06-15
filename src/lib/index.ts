import {getContext, setContext} from 'svelte'
import SvelteAsciidoc from './SvelteAsciidoc.svelte'
import type {NaturalRenderers, Renderers} from './renderers'

export default SvelteAsciidoc

const extraKey = Symbol('extrakey')
export function setExtra(extra: any) {
  setContext(extraKey, extra)
}
export function getExtra(): any {
  return getContext(extraKey)
}

const customRenderersKey = Symbol('customRenderers')
export function setCustomRenderers(cr: Partial<Renderers>) {
  setContext(customRenderersKey, cr)
}
export function getCustomRenderers(): Partial<Renderers> {
  return getContext(customRenderersKey) || {}
}

const naturalRenderersKey = Symbol('naturalRenderers')
export function setNaturalRenderers(cr: Partial<NaturalRenderers>) {
  setContext(naturalRenderersKey, cr)
}
export function getNaturalRenderers(): Partial<NaturalRenderers> {
  return getContext(naturalRenderersKey) || {}
}
