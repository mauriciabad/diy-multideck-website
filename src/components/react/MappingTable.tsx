import { Card, CardBody } from '@nextui-org/react'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import { useId, useMemo, useState } from 'react'
import Table3dAltLight from '../../assets/layouts/table-3d-alt-light.svg'
import Table3dLight from '../../assets/layouts/table-3d-light.svg'
import TableBasicLight from '../../assets/layouts/table-basic-light.svg'
import TableNumberLight from '../../assets/layouts/table-number-light.svg'
import { cn } from '../../lib/cn'
import {
  getFullCell,
  type GameMappingVariant,
} from '../../lib/schemas/gameMappingsSchema'
import { translateColor } from '../../lib/utils/mappingUtils'
import { Cell } from './Cell'
import { CellDetailsPanel } from './CellDetailsPanel'
import { RainbowGradientSvg } from './RainbowGradient'

type LayoutConfig = {
  bgImage: ImageMetadata
  gridColumns: number
  gridRows: number
  maxWidth: string
  cardPositions: (number | null)[][]
}

const LAYOUT_CONFIGS = {
  basic: {
    bgImage: TableBasicLight,
    gridColumns: 15,
    gridRows: 12,
    maxWidth: '33.3rem',
    // prettier-ignore
    cardPositions: [
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
  },
  '3d': {
    bgImage: Table3dLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
    // prettier-ignore
    cardPositions: [
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
  },
  '3d-alt': {
    bgImage: Table3dAltLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
    // prettier-ignore
    cardPositions: [
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
  },
  number: {
    bgImage: TableNumberLight,
    gridColumns: 10,
    gridRows: 16,
    maxWidth: '23.5rem',
    // prettier-ignore
    cardPositions: [
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
  },
} as const satisfies Record<GameMappingVariant['layout'], LayoutConfig>

export const MappingTable: FC<{
  mapping: GameMappingVariant
  className?: string
}> = ({ mapping, className }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const layout = LAYOUT_CONFIGS[mapping.layout]

  const id = useId()
  const rainbowGradientId = `rainbow-gradient-${id}`

  const fullCells = useMemo(() => {
    return layout.cardPositions
      .flat()
      .map((cardId) => (cardId !== null ? getFullCell(cardId, mapping) : null))
  }, [layout.cardPositions, mapping])

  const selectedGroupIds = useMemo(() => {
    return (
      fullCells.find((cell) => cell?.cardId === selectedCardId)?.groups ?? []
    )
  }, [mapping, selectedCardId, fullCells])

  const cardIdsInEachGroup = useMemo(() => {
    if (!mapping.groups) return {}
    return Object.fromEntries(
      Object.keys(mapping.groups).map((groupId) => [
        groupId,
        fullCells
          .filter((cell) => cell !== undefined && cell !== null)
          .filter((cell) => cell.groups?.includes(groupId))
          .map((cell) => cell.cardId),
      ])
    )
  }, [mapping])

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className={cn(
          'not-prose bg-white relative rounded-lg sm:rounded-xl',
          className
        )}
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <RainbowGradientSvg id={rainbowGradientId} />

        <MappingTableCellHighlight
          layout={layout}
          cardIds={selectedCardId ? [selectedCardId] : []}
          className="absolute inset-0 text-stone-200"
        />

        {selectedGroupIds.map((groupId) => {
          const group = mapping.groups?.[groupId]
          if (!group) return null

          const cardIdsInGroup = cardIdsInEachGroup[groupId]
          if (!cardIdsInGroup || cardIdsInGroup.length === 0) return null

          return (
            <MappingTableGroupHighlight
              key={groupId}
              layout={layout}
              cardIds={cardIdsInGroup}
              color={translateColor(group.color)}
              className="absolute inset-0 mix-blend-multiply"
            />
          )
        })}

        <MappingTableGrid layout={layout}>
          {layout.cardPositions.flat().map((cardId) =>
            cardId === null ? (
              <div key={cardId} />
            ) : (
              <Cell
                key={cardId}
                cardId={cardId}
                mapping={mapping}
                rainbowGradientId={rainbowGradientId}
                onClick={(cardId) => {
                  setSelectedCardId(cardId)
                }}
              />
            )
          )}
        </MappingTableGrid>

        <img
          {...layout.bgImage}
          alt={`${mapping.layout} layout background`}
          className="pointer-events-none relative"
        />
      </div>

      {selectedCardId ? (
        <CellDetailsPanel cardId={selectedCardId} mapping={mapping} />
      ) : (
        <Card className="w-full">
          <CardBody>
            <p className="text-default-500 text-center text-sm">
              <span className="hidden sm:inline">Click</span>
              <span className="sm:hidden">Tap</span> a cell for more details
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

const MAPPING_TABLE_GRID_LEFT_MARGIN = 285
const MAPPING_TABLE_GRID_RIGHT_MARGIN = 95
const MAPPING_TABLE_GRID_TOP_MARGIN = 285
const MAPPING_TABLE_GRID_BOTTOM_MARGIN = 95
const MAPPING_TABLE_GRID_CELL_SIZE = 190
const MAPPING_TABLE_GRID_HEIGHT = 3420
const MAPPING_TABLE_GRID_WIDTH = 2280

const MappingTableGrid: FC<
  PropsWithChildren<{
    layout: LayoutConfig
    className?: string
    style?: CSSProperties
  }>
> = ({ layout, children, className, style }) => {
  return (
    <div
      className={cn('grid absolute', className)}
      style={{
        gridTemplateColumns: `repeat(${layout.gridColumns}, 1fr)`,
        gridTemplateRows: `repeat(${layout.gridRows}, 1fr)`,
        top: `${
          (MAPPING_TABLE_GRID_TOP_MARGIN / layout.bgImage.height) * 100
        }%`,
        left: `${
          (MAPPING_TABLE_GRID_LEFT_MARGIN / layout.bgImage.width) * 100
        }%`,
        right: `${
          (MAPPING_TABLE_GRID_RIGHT_MARGIN / layout.bgImage.width) * 100
        }%`,
        bottom: `${
          (MAPPING_TABLE_GRID_BOTTOM_MARGIN / layout.bgImage.height) * 100
        }%`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const MappingTableGroupHighlight: FC<{
  layout: LayoutConfig
  cardIds: number[]
  color?: string
  className?: string
}> = ({ layout, cardIds, color = 'currentColor', className }) => {
  const id = useId()
  const maskId = `clip-path-${id}`
  const gooFilterId = `goo-filter-${id}`
  return (
    <svg
      viewBox={`0 0 ${MAPPING_TABLE_GRID_WIDTH} ${MAPPING_TABLE_GRID_HEIGHT}`}
      className={className}
    >
      <defs>
        <filter id={gooFilterId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -15"
            result="goo"
          />
          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
            result="goo"
          />
        </filter>

        <mask id={maskId}>
          <rect
            x={0}
            y={0}
            width={MAPPING_TABLE_GRID_WIDTH}
            height={MAPPING_TABLE_GRID_HEIGHT}
            fill="white"
          />
          {layout.cardPositions.map((row, iRow) => {
            return row.map((cardId, iCol) => {
              const isMatch = cardId !== null && cardIds.includes(cardId)
              if (!isMatch) return null
              return (
                <rect
                  key={cardId}
                  x={
                    MAPPING_TABLE_GRID_LEFT_MARGIN +
                    MAPPING_TABLE_GRID_CELL_SIZE * iCol
                  }
                  y={
                    MAPPING_TABLE_GRID_TOP_MARGIN +
                    MAPPING_TABLE_GRID_CELL_SIZE * iRow
                  }
                  width={MAPPING_TABLE_GRID_CELL_SIZE}
                  height={MAPPING_TABLE_GRID_CELL_SIZE}
                  fill="black"
                />
              )
            })
          })}
        </mask>
      </defs>

      <g filter={`url(#${gooFilterId})`}>
        <g mask={`url(#${maskId})`}>
          {layout.cardPositions.map((row, iRow) => {
            return row.map((cardId, iCol) => {
              const isMatch = cardId !== null && cardIds.includes(cardId)
              if (!isMatch) return null
              return (
                <rect
                  key={cardId}
                  x={
                    MAPPING_TABLE_GRID_LEFT_MARGIN +
                    MAPPING_TABLE_GRID_CELL_SIZE * iCol
                  }
                  y={
                    MAPPING_TABLE_GRID_TOP_MARGIN +
                    MAPPING_TABLE_GRID_CELL_SIZE * iRow
                  }
                  width={MAPPING_TABLE_GRID_CELL_SIZE}
                  height={MAPPING_TABLE_GRID_CELL_SIZE}
                  fill={color}
                  stroke={color}
                  strokeWidth={30}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )
            })
          })}
        </g>
      </g>
    </svg>
  )
}

const MappingTableCellHighlight: FC<{
  layout: LayoutConfig
  cardIds: number[]
  color?: string
  className?: string
}> = ({ layout, cardIds, color = 'currentColor', className }) => {
  return (
    <svg
      viewBox={`0 0 ${MAPPING_TABLE_GRID_WIDTH} ${MAPPING_TABLE_GRID_HEIGHT}`}
      className={className}
    >
      {layout.cardPositions.map((row, iRow) => {
        return row.map((cardId, iCol) => {
          const isMatch = cardId !== null && cardIds.includes(cardId)
          if (!isMatch) return null
          return (
            <rect
              key={cardId}
              x={
                MAPPING_TABLE_GRID_LEFT_MARGIN +
                MAPPING_TABLE_GRID_CELL_SIZE * iCol
              }
              y={
                MAPPING_TABLE_GRID_TOP_MARGIN +
                MAPPING_TABLE_GRID_CELL_SIZE * iRow
              }
              width={MAPPING_TABLE_GRID_CELL_SIZE}
              height={MAPPING_TABLE_GRID_CELL_SIZE}
              fill={color}
            />
          )
        })
      })}
    </svg>
  )
}
