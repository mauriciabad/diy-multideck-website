import { component, defineMarkdocConfig } from '@astrojs/markdoc/config'
import {
  shapeSuitIds,
  suitColors,
  suitEmojis,
  suitIds,
} from './src/components/markdown/suits'
import {
  shapeSuitV1Ids,
  suitV1Colors,
  suitV1Emojis,
  suitV1Ids,
} from './src/components/markdown/suits-v1'

export default defineMarkdocConfig({
  tags: {
    img: {
      render: component('./src/components/markdown/Img.astro'),
      selfClosing: true,
      attributes: {
        src: {
          type: String,
          required: true,
          errorLevel: 'error',
        },
        width: {
          type: [Number, String],
          required: false,
          errorLevel: 'error',
        },
        alt: {
          type: String,
          required: false,
          errorLevel: 'error',
        },
      },
    },
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
          matches: ['info', 'idea', 'warning'],
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
    coinFlipV1: {
      render: component('./src/components/markdown/CoinFlipV1.astro'),
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
    colorSuitV1: {
      render: component('./src/components/markdown/ColorSuitV1.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: Number,
          matches: [1, 2, 3, 4, 5, 6],
          errorLevel: 'error',
        },
        color: {
          type: String,
          matches: suitV1Colors,
          errorLevel: 'error',
        },
        noAlt: {
          type: Boolean,
          default: false,
        },
      },
    },
    shapeSuit: {
      render: component('./src/components/markdown/ShapeSuit.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: String,
          matches: shapeSuitIds,
          errorLevel: 'error',
        },
      },
    },
    shapeSuitV1: {
      render: component('./src/components/markdown/ShapeSuitV1.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: String,
          matches: shapeSuitV1Ids,
          errorLevel: 'error',
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
    drawingAreaIconV1: {
      render: component('./src/components/markdown/DrawingAreaIconV1.astro'),
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
          type: String,
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
    suitV1: {
      render: component('./src/components/markdown/SuitV1.astro'),
      selfClosing: true,
      attributes: {
        id: {
          type: Number,
          matches: suitV1Ids,
          errorLevel: 'error',
        },
        emoji: {
          type: String,
          matches: suitV1Emojis,
          errorLevel: 'error',
        },
      },
    },
    exampleSuitV1: {
      render: component('./src/components/markdown/ExampleSuitV1.astro'),
      selfClosing: true,
      attributes: {
        suit: {
          type: String,
          matches: ['3d'],
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
    cardDistributionTableV1: {
      render: component(
        './src/components/markdown/CardDistributionTableV1.astro'
      ),
      selfClosing: true,
    },
    suitsTable: {
      render: component('./src/components/markdown/SuitsTable.astro'),
      selfClosing: true,
    },
    suitsTableV1: {
      render: component('./src/components/markdown/SuitsTableV1.astro'),
      selfClosing: true,
    },
    cardAnatomyImg: {
      render: component(
        './src/components/markdown/images/CardAnatomyImg.astro'
      ),
      selfClosing: true,
    },
    cardAnatomyImgV1: {
      render: component(
        './src/components/markdown/images/CardAnatomyImgV1.astro'
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
    numberSuitImg: {
      render: component('./src/components/markdown/images/NumberSuitImg.astro'),
      selfClosing: true,
    },
    basicSuitImgV1: {
      render: component(
        './src/components/markdown/images/BasicSuitImgV1.astro'
      ),
      selfClosing: true,
    },
    '3dSuitImgV1': {
      render: component('./src/components/markdown/images/3dSuitImgV1.astro'),
      selfClosing: true,
    },
    numberSuitImgV1: {
      render: component(
        './src/components/markdown/images/NumberSuitImgV1.astro'
      ),
      selfClosing: true,
    },
    coinFlipV1Img: {
      render: component('./src/components/markdown/images/CoinFlipV1Img.astro'),
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
    drawingImgV1: {
      render: component('./src/components/markdown/images/DrawingImgV1.astro'),
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
    travelKitComponentsImg: {
      render: component(
        './src/components/markdown/images/TravelKitComponents.astro'
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
