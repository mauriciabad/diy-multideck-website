import { defineConfig } from 'astro/config'
import markdoc from '@astrojs/markdoc'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://diymultideck.mauri.app',
  integrations: [markdoc(), sitemap(), tailwind({ applyBaseStyles: false })],
})
