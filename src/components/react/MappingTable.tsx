import { Icon } from '@iconify/react'
import type { FC } from 'react'
import { useState } from 'react'
import Table3dAltLight from '../../assets/layouts/table-3d-alt-light.svg'
import Table3dLight from '../../assets/layouts/table-3d-light.svg'
import TableBasicLight from '../../assets/layouts/table-basic-light.svg'
import TableNumberLight from '../../assets/layouts/table-number-light.svg'
import { cn } from '../../lib/cn'
import {
  type GameMappingCellSchema,
  type GameMappingVariant,
  fillCellFromTemplate,
  fillDrawingFromTemplate,
  fillIconFromTemplate,
} from '../../lib/schemas/gameMappingsSchema'
import {
  ICON_MASK_ID_PREFIX,
  RAINBOW_GRADIENT_ID_PREFIX,
  iconTransformToCss,
  translateColor,
} from '../../lib/utils/mappingUtils'
import { CellDetailsPanel } from './CellDetailsPanel'

const LAYOUT_CONFIGS = {
  basic: {
    bgImage: TableBasicLight,
    gridColumns: 15,
    gridRows: 12,
    maxWidth: '33.3rem',
  },
  '3d': {
    bgImage: Table3dLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
  },
  '3d-alt': {
    bgImage: Table3dAltLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
  },
  number: {
    bgImage: TableNumberLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
  },
} as const satisfies Record<
  GameMappingVariant['layout'],
  {
    bgImage: ImageMetadata
    gridColumns: number
    gridRows: number
    maxWidth: string
  }
>

// prettier-ignore
const GRID_LAYOUTS = {
  basic: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 120, 121, 122, 123, 124],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 130, 131, 132, 133, 134],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 140, 141, 142, 143, 144],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 150, 151, 152, 153, 154],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 125, 126, 127, 128, 129],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 135, 136, 137, 138, 139],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 145, 146, 147, 148, 149],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 155, 156, 157, 158, 159],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, null, null, null, null, null],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, null, null, null, null, null],
    [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, null, null, null, null, null],
    [110, 111, 112, 113, 114, 115, 116, 117, 118, 119, null, null, null, null, null],
  ],
  number: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
    [110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
    [120, 121, 122, 123, 124, 125, 126, 127, 128, 129],
    [130, 131, 132, 133, 134, 135, 136, 137, 138, 139],
    [140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
    [150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
  ],
  '3d': [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
    [120, 121, 122, 123, 124, 125, 126, 127, 128, 129],
    [130, 131, 132, 133, 134, 135, 136, 137, 138, 139],
    [140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
    [150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
  ],
  '3d-alt': [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
    [110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
    [120, 121, 122, 123, 124, 125, 126, 127, 128, 129],
    [130, 131, 132, 133, 134, 135, 136, 137, 138, 139],
    [140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
    [150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
  ],
  
} as const

export const MappingTable: FC<{
  mapping: GameMappingVariant
  className?: string
}> = ({ mapping, className }) => {
  const [selectedCell, setSelectedCell] =
    useState<GameMappingCellSchema | null>(null)
  const layout = LAYOUT_CONFIGS[mapping.layout]
  const gridLayout = GRID_LAYOUTS[mapping.layout]

  // Create unique IDs for this table instance
  const rainbowGradientId = `${RAINBOW_GRADIENT_ID_PREFIX}-${mapping.layout}`

  // Create a map of cardId to cell for quick lookup
  const cellsByCardId = new Map(
    mapping.cells.map((cell) => [cell.cardId, cell])
  )

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'not-prose bg-white relative rounded-lg sm:rounded-xl',
          className
        )}
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <svg className="absolute w-0 h-0">
          <defs>
            <linearGradient
              id={rainbowGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientTransform="rotate(45, 0.5, 0.5)"
            >
              <stop offset="0%" stopColor="#8B83FF" />
              <stop offset="25%" stopColor="#8B83FF" />
              <stop offset="25%" stopColor="#00C0E9" />
              <stop offset="37.5%" stopColor="#00C0E9" />
              <stop offset="37.5%" stopColor="#5FDF6C" />
              <stop offset="50%" stopColor="#5FDF6C" />
              <stop offset="50%" stopColor="#F8D71E" />
              <stop offset="62.5%" stopColor="#F8D71E" />
              <stop offset="62.5%" stopColor="#FF8E00" />
              <stop offset="75%" stopColor="#FF8E00" />
              <stop offset="75%" stopColor="#FF532E" />
              <stop offset="100%" stopColor="#FF532E" />
            </linearGradient>
          </defs>
        </svg>

        <div
          className="grid absolute"
          style={{
            gridTemplateColumns: `repeat(${layout.gridColumns}, 1fr)`,
            gridTemplateRows: `repeat(${layout.gridRows}, 1fr)`,
            top: `${(285 / layout.bgImage.height) * 100}%`,
            left: `${(285 / layout.bgImage.width) * 100}%`,
            right: `${(95 / layout.bgImage.width) * 100}%`,
            bottom: `${(95 / layout.bgImage.height) * 100}%`,
          }}
        >
          {gridLayout.flat().map((cardId, index) => {
            if (cardId === null) return <div key={`empty-${index}`} />

            const cell = cellsByCardId.get(cardId)
            if (!cell) return <div key={`missing-${cardId}`} />

            const mergedCell = fillCellFromTemplate(cell, mapping.templateCells)
            const mergedIcon = fillIconFromTemplate(
              mergedCell.icon,
              mapping.templateIcons
            )
            const mergedDrawings =
              mergedCell.drawings?.map((drawing) =>
                fillDrawingFromTemplate(drawing, mapping.templateDrawings)
              ) ?? []

            const isRainbow = mergedIcon?.fill === 'rainbow'
            const maskId = `${ICON_MASK_ID_PREFIX}-${mapping.layout}-${cardId}`

            return (
              <div
                key={`${mergedCell.cardId}-${index}`}
                className={cn(
                  'flex flex-col items-center justify-center overflow-hidden relative cursor-pointer transition-colors',
                  selectedCell?.cardId === mergedCell.cardId && 'bg-primary/10'
                )}
                onClick={() => setSelectedCell(mergedCell)}
              >
                {mergedIcon?.srcIconId && (
                  <>
                    {isRainbow ? (
                      <svg className="absolute inset-0" viewBox="0 0 512 512">
                        <defs>
                          <mask id={maskId}>
                            <rect
                              x="0"
                              y="0"
                              width="512"
                              height="512"
                              fill="black"
                            />
                            <Icon
                              icon={mergedIcon.srcIconId}
                              width="512"
                              height="512"
                              style={{
                                color: '#ffffff',
                              }}
                            />
                          </mask>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="512"
                          height="512"
                          fill={`url(#${rainbowGradientId})`}
                          mask={`url(#${maskId})`}
                          style={{
                            transform: iconTransformToCss(mergedIcon.transform),
                          }}
                        />
                        {mergedIcon.stroke && (
                          <Icon
                            icon={mergedIcon.srcIconId}
                            width="512"
                            height="512"
                            style={{
                              color: 'transparent',
                              stroke: translateColor(mergedIcon.stroke.color),
                              strokeWidth: mergedIcon.stroke.width
                                ? (mergedIcon.stroke.width / 190) * 512
                                : undefined,
                              transform: iconTransformToCss(
                                mergedIcon.transform
                              ),
                            }}
                          />
                        )}
                      </svg>
                    ) : (
                      <Icon
                        icon={mergedIcon.srcIconId}
                        className="size-full"
                        stroke={translateColor(mergedIcon.stroke?.color)}
                        strokeWidth={
                          mergedIcon.stroke?.width
                            ? (mergedIcon.stroke.width / 190) * 512
                            : undefined
                        }
                        style={{
                          color: translateColor(mergedIcon.fill),
                          transform: iconTransformToCss(mergedIcon.transform),
                        }}
                      />
                    )}
                  </>
                )}
                {mergedCell.text && (
                  <svg
                    className="absolute select-none font-brand inset-0"
                    style={{
                      transform: iconTransformToCss(mergedCell.text.transform),
                    }}
                    viewBox="0 0 190 190"
                  >
                    <g
                      xmlns="http://www.w3.org/2000/svg"
                      fontFamily="Manrope, Inter var, Inter var experimental, Inter, Arial, Helvetica, sans-serif"
                      fontSize={mergedCell.text.size ?? 100}
                      fontStyle="normal"
                      fontWeight={mergedCell.text.weight ?? 700}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      textDecoration={
                        translateColor(mergedCell.text.fill) ?? '#fff'
                      }
                    >
                      <g>
                        <text
                          stroke={
                            translateColor(mergedCell.text.stroke?.color) ??
                            '#000'
                          }
                          strokeWidth={mergedCell.text.stroke?.width ?? 20}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          x="50%"
                          y="50%"
                        >
                          {mergedCell.text.content}
                        </text>
                        <text
                          fill={translateColor(mergedCell.text.fill) ?? '#fff'}
                          x="50%"
                          y="50%"
                        >
                          {mergedCell.text.content}
                        </text>
                      </g>
                    </g>
                  </svg>
                )}
                {mergedDrawings.length > 0 && (
                  <svg viewBox="0 0 190 190" className="absolute inset-0">
                    <path
                      fillRule="evenodd"
                      d="M145.905 7.399c.47-1.909 1.494-3.351 2.455-4.356 1.792-1.874 4.565-3.392 7.993-2.972 2.577.295 4.623 1.532 6.113 2.932l6.123 6.196.036.038.032.034 5.41 5.501 2.084 1.821.001.001.074.063a4.85 4.85 0 0 1 .374.355l.075.078c.683.721 1.31 1.613 1.761 2.651.604.023 1.21.114 1.809.277 3.146.856 5.487 3.538 5.86 6.813.089.783.181 1.156.3 1.49.141.397.393.942 1.005 2.028.978 1.737 1.245 3.712.856 5.559.264.318.506.662.721 1.031 2.098 3.603.832 8.189-2.756 10.239-.418.239-.718.437-.929.591l.016.313.008.145v.002a1.74 1.74 0 0 1 .004.075c.044.786.123 2.215-.076 3.778-.342 2.684-1.207 5.617-3.407 8.106-2.172 2.457-4.903 3.635-7.23 4.316-4.318 1.265-8.289-.135-10.669-1.274-1.384-.663-2.978-1.718-4.045-2.455l-.112-.078c-2.45.82-5.027 1.404-7.562 1.65-4.076.397-7.78-2.558-8.192-6.705-.406-4.091 2.557-7.668 6.546-8.156a14.66 14.66 0 0 1 .756-5.69c.977-2.857 2.936-5.634 5.886-7.362 2.543-1.49 5.626-2.052 8.715-1.308l-.042-.253c-.073-.478-.102-.954-.089-1.425-.173-.086-.319-.163-.517-.279-.169-.099-.259-.162-.424-.268-3.786-2.417-5.759-4.422-8.86-7.334l-.006-.005-.023-.022-5.991-5.699c-1.295-1.218-2.613-2.739-3.49-4.588l-.004-.008c-.009-.018-.017-.036-.026-.055l-.01-.022-.02-.045-.003-.007c-.764-1.706-1.029-3.691-.53-5.715z"
                      fill="#fff"
                    />
                    <g fill="#000">
                      <path d="M150.759 8.593c.203-.825.664-1.521 1.213-2.096.976-1.02 2.272-1.655 3.793-1.463 1.267.14 2.362.751 3.278 1.611l5.945 6.021.002.002.032.034 5.622 5.712 2.254 1.973.075.065.07.073c.703.742 1.167 1.714 1.083 2.852l-.004.053-.007.055c-.121.917-.54 1.71-1.157 2.355-.624.653-1.39 1.119-2.276 1.353-.944.249-1.954.187-2.873-.349l-.07-.041-.063-.044-.002-.001c-2.508-1.749-5.257-4.036-8.244-6.841l-.005-.005-6.002-5.709c-1.049-.986-1.895-2.016-2.408-3.098l-.004-.008-.01-.023-.003-.007c-.347-.774-.45-1.621-.239-2.476zm21.556 20.484c-1.075.617-1.66 1.822-1.475 3.04s1.103 2.199 2.315 2.474c2.34.531 3.492 1.022 5.787 2.288 1.181.651 2.655.447 3.61-.5s1.16-2.408.501-3.578c-1.302-2.311-1.685-3.371-1.917-5.407-.138-1.218-1.011-2.229-2.204-2.554a3.04 3.04 0 0 0-3.211 1.081c-1.336 1.749-1.972 2.334-3.406 3.156z" />
                      <path
                        fillRule="evenodd"
                        d="M156.069 43.412a9.59 9.59 0 0 0 .702 7.792c-1.803.616-3.696 1.058-5.516 1.235-1.374.134-2.378 1.346-2.243 2.707s1.358 2.356 2.732 2.222c2.908-.283 5.969-1.109 8.764-2.283l.364.227s3.247 2.454 5.234 3.405 4.562 1.731 7.105.986c1.877-.55 3.595-1.365 4.889-2.829 1.302-1.473 1.925-3.317 2.194-5.427.14-1.105.083-2.152.039-2.947l-.008-.149c-.048-.886-.062-1.459.031-1.986.132-.741.55-1.904 3.393-3.529 1.196-.684 1.606-2.198.916-3.383s-2.218-1.591-3.414-.907c-3.655 2.09-5.347 4.32-5.817 6.959-.206 1.157-.146 2.265-.101 3.098v.016c.05.909.084 1.554.001 2.207-.197 1.548-.582 2.317-.994 2.784-.42.475-1.125.927-2.546 1.343-.35.102-.786.125-1.314.043-.61-.094-1.341-.328-2.199-.739l-.686-.352c-.754-.412-1.503-.9-2.217-1.412.757-.508 1.456-1.041 2.082-1.591 1.794-1.578 3.487-3.748 3.488-6.293.002-2.856-2.053-4.892-4.864-6.17-2.232-1.014-4.501-.767-6.332.306-1.761 1.032-3.031 2.76-3.683 4.667zm7.931-.47a1.72 1.72 0 0 0-1.704.068c-.573.336-1.161 1.022-1.493 1.993a4.65 4.65 0 0 0 .553 4.144c1.069-.613 2.016-1.273 2.785-1.95 1.481-1.302 1.809-2.222 1.809-2.591v-.003c0-.077.007-.772-1.95-1.661z"
                      />
                    </g>
                  </svg>
                )}
              </div>
            )
          })}
        </div>

        <img
          {...layout.bgImage}
          alt={`${mapping.layout} layout background`}
          className="pointer-events-none relative"
        />
      </div>

      {selectedCell && (
        <CellDetailsPanel cell={selectedCell} mapping={mapping} />
      )}
    </div>
  )
}
