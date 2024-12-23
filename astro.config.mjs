// @ts-check
import markdoc from '@astrojs/markdoc'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { generateZips } from './generateZipsPlugin.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://diymultideck.mauri.app',
  integrations: [
    markdoc(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    generateZips({
      zips: [
        {
          name: 'downloads/assets-v2.zip',
          content: {
            suits: {
              'basic-0.svg': 'images/suits/0.svg',
              'basic-1.svg': 'images/suits/1.svg',
              'basic-2.svg': 'images/suits/2.svg',
              'basic-3.svg': 'images/suits/3.svg',
              'basic-4.svg': 'images/suits/4.svg',
              'basic-5.svg': 'images/suits/5.svg',
              'basic-6.svg': 'images/suits/6.svg',
              'basic-7.svg': 'images/suits/7.svg',
              'basic-8.svg': 'images/suits/8.svg',
              'basic-9.svg': 'images/suits/9.svg',
              'basic-10.svg': 'images/suits/10.svg',
              'basic-11.svg': 'images/suits/11.svg',

              '3d-A00.svg': 'images/suits/A00.svg',
              '3d-A01.svg': 'images/suits/A01.svg',
              '3d-A02.svg': 'images/suits/A02.svg',
              '3d-A03.svg': 'images/suits/A03.svg',
              '3d-A04.svg': 'images/suits/A04.svg',
              '3d-A05.svg': 'images/suits/A05.svg',
              '3d-A10.svg': 'images/suits/A10.svg',
              '3d-A11.svg': 'images/suits/A11.svg',
              '3d-A12.svg': 'images/suits/A12.svg',
              '3d-A13.svg': 'images/suits/A13.svg',
              '3d-A14.svg': 'images/suits/A14.svg',
              '3d-A15.svg': 'images/suits/A15.svg',
              '3d-A20.svg': 'images/suits/A20.svg',
              '3d-A21.svg': 'images/suits/A21.svg',
              '3d-A22.svg': 'images/suits/A22.svg',
              '3d-A23.svg': 'images/suits/A23.svg',
              '3d-A24.svg': 'images/suits/A24.svg',
              '3d-A24-alt.svg': 'images/suits/A24-alt.svg',
            },
            colors: {
              'black.svg': 'images/colors/black.svg',
              'gray.svg': 'images/colors/gray.svg',
              'purple.svg': 'images/colors/purple.svg',
              'blue.svg': 'images/colors/blue.svg',
              'green.svg': 'images/colors/green.svg',
              'rainbow.svg': 'images/colors/rainbow.svg',
              'brown.svg': 'images/colors/brown.svg',
              'orange.svg': 'images/colors/orange.svg',
              'red.svg': 'images/colors/red.svg',
              'white.svg': 'images/colors/white.svg',
              'cyan.svg': 'images/colors/cyan.svg',
              'pink.svg': 'images/colors/pink.svg',
              'yellow.svg': 'images/colors/yellow.svg',
              'textured-blue.svg': 'images/colors/textured-blue.svg',
              'textured-yellow.svg': 'images/colors/textured-yellow.svg',
              'textured-green.svg': 'images/colors/textured-green.svg',
              'textured-red.svg': 'images/colors/textured-red.svg',
              'textured-black.svg': 'images/colors/textured-black.svg',
              'textured-white.svg': 'images/colors/textured-white.svg',
            },
            shapes: {
              'heart.svg': 'images/shapes/heart.svg',
              'circle.svg': 'images/shapes/circle.svg',
              'square.svg': 'images/shapes/square.svg',
            },
            'drawing areas': {
              'A.svg': 'images/drawing-areas/A.svg',
              'B.svg': 'images/drawing-areas/B.svg',
              'C.svg': 'images/drawing-areas/C.svg',
              'D.svg': 'images/drawing-areas/D.svg',
              'E.svg': 'images/drawing-areas/E.svg',
            },
            cards: {
              'back.svg': 'images/home/cards/back.svg',
              'cover.svg': 'images/home/cards/cover.svg',
              'front.svg': 'images/home/cards/front.svg',
              'notes.svg': 'images/home/cards/notes.svg',
            },
            guides: {
              counters: {
                '1-to-1-dark.svg': 'images/home/counter/1-to-1-dark.svg',
                '1-to-1-light.svg': 'images/home/counter/1-to-1-light.svg',
                'bingo-dark.svg': 'images/home/counter/bingo-dark.svg',
                'bingo-light.svg': 'images/home/counter/bingo-light.svg',
                'pointing-dark.svg': 'images/home/counter/pointing-dark.svg',
                'pointing-light.svg': 'images/home/counter/pointing-light.svg',
              },
              'drawing areas': {
                'drawing-areas.svg': 'images/home/drawing/drawing-areas.svg',
              },
              'card anatomy': {
                'card-anatomy-dark.svg':
                  'images/home/guides/card-anatomy-dark.svg',
                'card-anatomy-light.svg':
                  'images/home/guides/card-anatomy-light.svg',
              },
              'travel kit': {
                'travel-kit-dark.svg': 'images/home/travel-kit-dark.svg',
                'travel-kit-light.svg': 'images/home/travel-kit-light.svg',
              },
            },
            'mapping sheets': {
              'table-3d-dark.svg': 'images/home/layouts/table-3d-dark.svg',
              'table-3d-light.svg': 'images/home/layouts/table-3d-light.svg',
              'table-3d-alt-dark.svg':
                'images/home/layouts/table-3d-alt-dark.svg',
              'table-3d-alt-light.svg':
                'images/home/layouts/table-3d-alt-light.svg',
              'table-basic-dark.svg':
                'images/home/layouts/table-basic-dark.svg',
              'table-basic-light.svg':
                'images/home/layouts/table-basic-light.svg',
              'table-number-dark.svg':
                'images/home/layouts/table-number-dark.svg',
              'table-number-light.svg':
                'images/home/layouts/table-number-light.svg',
            },
            'layouts preview': {
              '3d.png': 'images/home/layouts/preview-mini-3d.png',
              'basic.png': 'images/home/layouts/preview-mini-basic.png',
              'number.png': 'images/home/layouts/preview-mini-number.png',
            },
            'card previews': {
              'preview-all-cards.png': 'images/home/preview.png',
              'preview-some-cards.png':
                'images/home/card-preview-all-suits-and-extras.png',
              'preview-spread-cards.png': 'images/home/spread-cards.png',
            },
          },
        },
        {
          name: 'downloads/assets-v1.zip',
          content: {
            suits: {
              'basic-0.svg': 'images/suits/v1/0.svg',
              'basic-1.svg': 'images/suits/v1/1.svg',
              'basic-2.svg': 'images/suits/v1/2.svg',
              'basic-3.svg': 'images/suits/v1/3.svg',
              'basic-4.svg': 'images/suits/v1/4.svg',
              'basic-5.svg': 'images/suits/v1/5.svg',
              'basic-6.svg': 'images/suits/v1/6.svg',
              'basic-7.svg': 'images/suits/v1/7.svg',
              'basic-8.svg': 'images/suits/v1/8.svg',
              'basic-9.svg': 'images/suits/v1/9.svg',
              'basic-10.svg': 'images/suits/v1/10.svg',
              'basic-11.svg': 'images/suits/v1/11.svg',

              '3d-111.svg': 'images/suits/v1/111.svg',
              '3d-112.svg': 'images/suits/v1/112.svg',
              '3d-113.svg': 'images/suits/v1/113.svg',
              '3d-114.svg': 'images/suits/v1/114.svg',
              '3d-115.svg': 'images/suits/v1/115.svg',
              '3d-121.svg': 'images/suits/v1/121.svg',
              '3d-122.svg': 'images/suits/v1/122.svg',
              '3d-123.svg': 'images/suits/v1/123.svg',
              '3d-124.svg': 'images/suits/v1/124.svg',
              '3d-125.svg': 'images/suits/v1/125.svg',
              '3d-131.svg': 'images/suits/v1/131.svg',
              '3d-132.svg': 'images/suits/v1/132.svg',
              '3d-133.svg': 'images/suits/v1/133.svg',
              '3d-134.svg': 'images/suits/v1/134.svg',
              '3d-135.svg': 'images/suits/v1/135.svg',
              '3d-145.svg': 'images/suits/v1/145.svg',
            },
            colors: {
              'black.svg': 'images/colors/v1/black.svg',
              'gray.svg': 'images/colors/v1/gray.svg',
              'purple.svg': 'images/colors/v1/purple.svg',
              'blue.svg': 'images/colors/v1/blue.svg',
              'green.svg': 'images/colors/v1/green.svg',
              'rainbow.svg': 'images/colors/v1/rainbow.svg',
              'brown.svg': 'images/colors/v1/brown.svg',
              'orange.svg': 'images/colors/v1/orange.svg',
              'red.svg': 'images/colors/v1/red.svg',
              'white.svg': 'images/colors/v1/white.svg',
              'cyan.svg': 'images/colors/v1/cyan.svg',
              'pink.svg': 'images/colors/v1/pink.svg',
              'yellow.svg': 'images/colors/v1/yellow.svg',
            },
            shapes: {
              'heart.svg': 'images/shapes/v1/heart.svg',
              'circle.svg': 'images/shapes/v1/circle.svg',
              'square.svg': 'images/shapes/v1/square.svg',
              'rainbow.svg': 'images/shapes/v1/rainbow.svg',
            },
            'coin flips': {
              no: 'images/coin-flips/v1/no.svg',
              yes: 'images/coin-flips/v1/yes.svg',
              unknown: 'images/coin-flips/v1/unknown.svg',
            },
            'drawing areas': {
              'A.svg': 'images/drawing-areas/v1/A.svg',
              'B.svg': 'images/drawing-areas/v1/B.svg',
              'C.svg': 'images/drawing-areas/v1/C.svg',
              'D.svg': 'images/drawing-areas/v1/D.svg',
              'E.svg': 'images/drawing-areas/v1/E.svg',
            },
            cards: {
              'back.png': 'images/home-v1/cards/card-back.png',
              'cover.png': 'images/home-v1/cards/card-cover.png',
              'front.png': 'images/home-v1/cards/card-front.png',
              'front.svg': 'images/home-v1/cards/card-front.svg',
              'notes.png': 'images/home-v1/cards/card-notes.png',
            },
            guides: {
              'counter-chain-pointing.svg':
                'images/home-v1/counters/chained-pointing-counter.svg',
              'counter-pointing.svg':
                'images/home-v1/counters/pointing-counter.svg',
              'counter-stacking.svg':
                'images/home-v1/counters/stacking-counter.svg',
              'drawing-areas.png': 'images/home-v1/drawing/drawing-areas.png',
              'card-anatomy.png': 'images/home-v1/card-anatomy.png',
              'travel-kit.png': 'images/home-v1/travel-kit.png',
            },
            'layouts preview': {
              '3d.png': 'images/home-v1/layouts/mini-cards-3d.png',
              'basic.png': 'images/home-v1/layouts/mini-cards-basic.png',
              'sequential.png':
                'images/home-v1/layouts/mini-cards-sequential.png',
              'coin.png': 'images/home-v1/layouts/mini-cards-coin.png',
              'pyramidal.png':
                'images/home-v1/layouts/mini-cards-pyramidal.png',
            },
            'card previews': {
              'preview-all-cards.png': 'images/home-v1/preview.png',
              'preview-some-cards.png': 'images/home-v1/example-cards.png',
              'preview-spread-cards.png': 'images/home-v1/spread-cards.png',
            },
          },
        },
      ],
    }),
  ],
})
