import {AbstractBlock} from '@asciidoctor/core'

export function getLineNumber(block: AbstractBlock): {
  ['data-lineno']?: number
} {
  const lineno = block.getLineNumber()
  if (lineno) {
    return {'data-lineno': lineno}
  }
  return {}
}

export function getRole(block: AbstractBlock): string | undefined {
  const role = block.getRole()
  if (typeof role === 'string') return role
  return undefined
}
