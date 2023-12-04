import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component('./src/components/markdown/Callout.astro'),
      children: ['text'],
      selfClosing: true,
      attributes: {
        text: {
          type: String,
        },
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'idea'],
          errorLevel: 'critical',
        },
      },
    },
    usedCards: {
      render: component('./src/components/markdown/UsedCards.astro'),
      selfClosing: true,
      attributes: {
        cards: {
          type: Array,
          errorLevel: 'critical',
        },
        layout: {
          type: String,
          default: 'basic',
          matches: ['basic', '3d', 'sequential', 'pyramidal', 'coin'],
          errorLevel: 'critical',
        },
      },
    },
  },
})
