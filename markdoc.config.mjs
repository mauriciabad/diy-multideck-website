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
    suit: {
      render: component('./src/components/markdown/Suit.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: Number,
          matches: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 111, 121, 131, 112, 122, 132,
            113, 123, 133, 114, 124, 134, 115, 125, 135, 145,
          ],
          errorLevel: 'critical',
        },
        emoji: {
          type: String,
          matches: [
            '🔥',
            '💧',
            '⭐',
            '🍀',
            '🍊',
            '🍆',
            '💭',
            '🕷️',
            '🌸',
            '💎',
            '💩',
            '🗿',
            '❤️',
            '🔴',
            '🟥',
            '💙',
            '🔵',
            '🟦',
            '💛',
            '🟡',
            '🟨',
            '💚',
            '🟢',
            '🟩',
            '🖤',
            '⚫️',
            '⬛️',
            '🌈',
          ],
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
    coinFlipImg: {
      render: component('./src/components/markdown/CoinFlipImg.astro'),
      selfClosing: true,
    },
    cardImg: {
      render: component('./src/components/markdown/CardImg.astro'),
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
