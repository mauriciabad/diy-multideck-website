// @ts-check
import markdoc from '@astrojs/markdoc'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { generateZipsOptions } from './generateZipsOptions.ts'
import { generateZips } from './generateZipsPlugin.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://diymultideck.mauri.app',
  integrations: [
    markdoc(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    generateZips(generateZipsOptions),
  ],
})
