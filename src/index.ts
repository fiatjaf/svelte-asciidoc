import {setContext} from 'svelte'
import SvelteMarkdown from './SvelteMarkdown.svelte'
import {Renderers} from './renderers'

export default SvelteMarkdown

const extraKey = Symbol('extrakey')
export function setExtra(extra: any) {
  setContext(extraKey, extra)
}

const customRenderersKey = Symbol('customRenderers')
export function setCustomRenderers(cr: Partial<Renderers>) {
  setContext(customRenderersKey, cr)
}
