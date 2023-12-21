import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'
import { suitIds, suitEmojis } from './src/components/markdown/suits'

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
    coinFlip: {
      render: component('./src/components/markdown/CoinFlip.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: String,
          matches: ['yes', 'no', 'unknown'],
          errorLevel: 'critical',
        },
      },
    },
    colorSuit: {
      render: component('./src/components/markdown/ColorSuit.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: Number,
          matches: [1, 2, 3, 4, 5, 6],
          errorLevel: 'critical',
        },
        color: {
          type: String,
          matches: ['red', 'blue', 'yellow', 'green', 'black', 'rainbow'],
          errorLevel: 'critical',
        },
      },
    },
    suit: {
      render: component('./src/components/markdown/Suit.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: Number,
          matches: suitIds,
          errorLevel: 'critical',
        },
        emoji: {
          type: String,
          matches: suitEmojis,
          errorLevel: 'critical',
        },
      },
    },
    cardDistributionTable: {
      render: component(
        './src/components/markdown/CardDistributionTable.astro'
      ),
      selfClosing: true,
    },
    basicSuitImg: {
      render: component('./src/components/markdown/images/BasicSuitImg.astro'),
      selfClosing: true,
    },
    '3dSuitImg': {
      render: component('./src/components/markdown/images/3dSuitImg.astro'),
      selfClosing: true,
    },
    coinFlipImg: {
      render: component('./src/components/markdown/images/CoinFlipImg.astro'),
      selfClosing: true,
    },
    pyramidalRankImg: {
      render: component(
        './src/components/markdown/images/PyramidalRankImg.astro'
      ),
      selfClosing: true,
    },
    cardImg: {
      render: component('./src/components/markdown/images/CardImg.astro'),
      selfClosing: true,
      attributes: {
        src: {
          type: String,
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
