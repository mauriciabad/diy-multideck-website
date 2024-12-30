import type { FC } from 'react'
import { cn } from '../../lib/cn'
import {
  type GameMappingIconSchema,
  type GameMappingVariant,
  mergeIcon,
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
      transform.translateX ? `translateX(${transform.translateX})` : null,
      transform.translateY ? `translateY(${transform.translateY})` : null,
      transform.rotate ? `rotate(${transform.rotate}deg)` : null,
    ]
      .filter((value) => value !== null)
      .join(' ') || undefined
  )
}

function iconFillToCss(fill: string | undefined) {
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
          const mergedIcon = cell.icon
            ? mergeIcon(cell.icon, mapping.templateIcons)
            : null

          return (
            <div
              key={`${cell.cardId}-${index}`}
              className="flex flex-col items-center justify-center overflow-hidden"
            >
              {mergedIcon && (
                <Icon
                  icon={mergedIcon.srcIconId}
                  className="size-full"
                  style={{
                    color: iconFillToCss(mergedIcon.fill),
                    transform: iconTransformToCss(mergedIcon.transform),
                  }}
                />
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
