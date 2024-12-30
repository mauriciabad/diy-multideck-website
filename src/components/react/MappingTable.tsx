import type { FC } from 'react'
import { cn } from '../../lib/cn'
import {
  type GameMappingIconSchema,
  type GameMappingVariant,
  fillCellFromTemplate,
  fillIconFromTemplate,
} from '../../lib/schemas/gameMappingsSchema'
import { Icon } from '@iconify/react'
import TableBasicLight from '../../assets/layouts/table-basic-light.svg'
import Table3dLight from '../../assets/layouts/table-3d-light.svg'
import Table3dAltLight from '../../assets/layouts/table-3d-alt-light.svg'
import TableNumberLight from '../../assets/layouts/table-number-light.svg'

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

const COLOR_MAPPINGS = {
  red: '#f44336',
  blue: '#1d89f3',
  green: '#15b550',
  yellow: '#e8bd00',
  orange: '#ff8e00',
  purple: '#8F4EFF',
  white: '#fefefe',
  black: '#424242',
  pink: '#ff77c4',
  cyan: '#12cdd4',
  brown: '#b79664',
  // rainbow: 'linear-gradient(90deg, #8B83FF 0%, #8B83FF 16%, #00C0E9 17%, #00C0E9 33%, #5FDF6C 34%, #5FDF6C 49%, #F8D71E 50%, #F8D71E 66%, #FF8E00 67%, #FF8E00 83%, #FF532E 84%, #FF532E 100%)',
} as const satisfies Record<string, string>

function iconTransformToCss(transform: GameMappingIconSchema['transform']) {
  if (!transform) return undefined
  return (
    [
      transform.scale ? `scale(${transform.scale})` : null,
      transform.translateX
        ? `translateX(${transform.translateX * 100}%)`
        : null,
      transform.translateY
        ? `translateY(${transform.translateY * 100}%)`
        : null,
      transform.rotate ? `rotate(${transform.rotate}deg)` : null,
    ]
      .filter((value) => value !== null)
      .join(' ') || undefined
  )
}

function translateColor(fill: string | undefined) {
  if (!fill) return undefined
  return COLOR_MAPPINGS[fill as keyof typeof COLOR_MAPPINGS] ?? fill
}

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
  const layout = LAYOUT_CONFIGS[mapping.layout]
  const gridLayout = GRID_LAYOUTS[mapping.layout]

  // Create a map of cardId to cell for quick lookup
  const cellsByCardId = new Map(
    mapping.cells.map((cell) => [cell.cardId, cell])
  )

  return (
    <div
      className={cn(
        'not-prose bg-white relative rounded-lg sm:rounded-xl',
        className
      )}
      style={{
        maxWidth: layout.maxWidth,
      }}
    >
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

          return (
            <div
              key={`${mergedCell.cardId}-${index}`}
              className="flex flex-col items-center justify-center overflow-hidden relative"
            >
              {mergedIcon?.srcIconId && (
                <Icon
                  icon={mergedIcon.srcIconId}
                  className="size-full"
                  style={{
                    color: translateColor(mergedIcon.fill),
                    transform: iconTransformToCss(mergedIcon.transform),
                  }}
                />
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
  )
}
