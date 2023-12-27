import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'
import {
  suitIds,
  suitEmojis,
  suitColors,
} from './src/components/markdown/suits'

export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component('./src/components/markdown/Callout.astro'),
      children: ['paragraph', 'list', 'strong', 'em', 'code', 'link'],
      selfClosing: false,
      attributes: {
        text: {
          type: String,
        },
        type: {
          type: String,
          default: 'info',
          matches: ['info', 'idea'],
          errorLevel: 'error',
        },
      },
    },
    columns: {
      render: component('./src/components/markdown/Columns.astro'),
      children: ['paragraph', 'list', 'strong', 'em', 'code', 'link'],
      selfClosing: false,
    },
    buyBanner: {
      render: component('./src/components/BuyBanner.astro'),
      selfClosing: true,
      attributes: {
        size: {
          type: String,
          default: 'large',
          matches: ['large', 'small'],
          errorLevel: 'error',
        },
        class: {
          type: String,
        },
      },
    },
    cardImgWithText: {
      render: component(
        './src/components/markdown/images/CardImgWithText.astro'
      ),
      children: ['paragraph', 'list', 'strong', 'em', 'code', 'link'],
      selfClosing: false,
      attributes: {
        src: {
          type: String,
          errorLevel: 'error',
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
          errorLevel: 'error',
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
          errorLevel: 'error',
        },
        color: {
          type: String,
          matches: suitColors,
          errorLevel: 'error',
        },
        noAlt: {
          type: Boolean,
          default: false,
        },
      },
    },
    drawingAreaIcon: {
      render: component('./src/components/markdown/DrawingAreaIcon.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: String,
          matches: ['A', 'B', 'C', 'D', 'E'],
          errorLevel: 'error',
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
          errorLevel: 'error',
        },
        emoji: {
          type: String,
          matches: suitEmojis,
          errorLevel: 'error',
        },
      },
    },
    cardDistributionTable: {
      render: component(
        './src/components/markdown/CardDistributionTable.astro'
      ),
      selfClosing: true,
    },
    suitsTable: {
      render: component('./src/components/markdown/SuitsTable.astro'),
      selfClosing: true,
    },
    cardAnatomyImg: {
      render: component(
        './src/components/markdown/images/CardAnatomyImg.astro'
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
    sequentialNumberImg: {
      render: component(
        './src/components/markdown/images/SequentialNumberImg.astro'
      ),
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
    pointingCounterImg: {
      render: component(
        './src/components/markdown/images/PointingCounterImg.astro'
      ),
      selfClosing: true,
    },
    drawingImg: {
      render: component('./src/components/markdown/images/DrawingImg.astro'),
      selfClosing: true,
    },
    chainedPointingCounterImg: {
      render: component(
        './src/components/markdown/images/ChainedPointingCounterImg.astro'
      ),
      selfClosing: true,
    },
    stackingCounterImg: {
      render: component(
        './src/components/markdown/images/StackingCounterImg.astro'
      ),
      selfClosing: true,
    },
    cardImg: {
      render: component('./src/components/markdown/images/CardImg.astro'),
      selfClosing: true,
      attributes: {
        src: {
          type: String,
          errorLevel: 'error',
        },
      },
    },
    featureSummary: {
      render: component('./src/components/markdown/FeatureSummary.astro'),
      children: ['paragraph', 'list', 'strong', 'em', 'code', 'link'],
      selfClosing: false,
    },
    usedCards: {
      render: component('./src/components/markdown/UsedCards.astro'),
      selfClosing: true,
      attributes: {
        cards: {
          type: Array,
          errorLevel: 'error',
        },
        layout: {
          type: String,
          default: 'basic',
          matches: ['basic', '3d', 'sequential', 'pyramidal', 'coin'],
          errorLevel: 'error',
        },
      },
    },
  },
})
