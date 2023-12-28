import type { Render } from 'astro:content'

export type MarkdownContent = Awaited<Render['.mdoc' | '.md']>['Content']
