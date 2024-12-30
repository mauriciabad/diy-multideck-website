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

export const MappingTable: FC<{
  mapping: GameMappingVariant
  className?: string
}> = ({ mapping, className }) => {
  const layout = LAYOUT_CONFIGS[mapping.layout]

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
        {mapping.cells.map((cell, index) => {
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
                    font-family="Manrope, Inter var, Inter var experimental, Inter, Arial, Helvetica, sans-serif"
                    font-size={mergedCell.text.size ?? 100}
                    font-style="normal"
                    font-weight={mergedCell.text.weight ?? 700}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    text-decoration={
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
                        stroke-linejoin="round"
                        stroke-linecap="round"
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
