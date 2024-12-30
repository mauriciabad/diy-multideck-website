import { Card, CardBody } from '@nextui-org/react'
import type { FC } from 'react'
import { useId, useState } from 'react'
import Table3dAltLight from '../../assets/layouts/table-3d-alt-light.svg'
import Table3dLight from '../../assets/layouts/table-3d-light.svg'
import TableBasicLight from '../../assets/layouts/table-basic-light.svg'
import TableNumberLight from '../../assets/layouts/table-number-light.svg'
import { cn } from '../../lib/cn'
import { type GameMappingVariant } from '../../lib/schemas/gameMappingsSchema'
import { Cell } from './Cell'
import { CellDetailsPanel } from './CellDetailsPanel'
import { RainbowGradientSvg } from './RainbowGradient'

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
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const layout = LAYOUT_CONFIGS[mapping.layout]
  const gridLayout = GRID_LAYOUTS[mapping.layout]

  const id = useId()
  const rainbowGradientId = `rainbow-gradient-${id}`

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
          {gridLayout.flat().map((cardId) =>
            cardId === null ? (
              <div key={cardId} />
            ) : (
              <Cell
                key={cardId}
                cardId={cardId}
                mapping={mapping}
                isSelected={selectedCardId === cardId}
                rainbowGradientId={rainbowGradientId}
                onClick={(cardId) => {
                  setSelectedCardId(cardId)
                }}
              />
            )
          )}
        </div>

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
