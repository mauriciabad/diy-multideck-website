import { Card, CardBody } from '@nextui-org/react'
import type { FC } from 'react'
import { cn } from '../../lib/cn'
import type {
  GameMappingCellSchema,
  GameMappingVariant,
} from '../../lib/schemas/gameMappingsSchema'
import { translateColor } from '../../lib/utils/mappingUtils'

export const CellDetailsPanel: FC<{
  cell: GameMappingCellSchema
  mapping: GameMappingVariant
  className?: string
}> = ({ cell, mapping, className }) => {
  console.log(cell)
  return (
    <Card className={cn('w-full', className)}>
      <CardBody className="block">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold leading-none sm:leading-none">
              {cell.name}
            </h2>
            <p className="text-sm sm:text-base text-default-500">
              {cell.notes}
            </p>
          </div>
          <div className="bg-default-100 size-14 flex items-center justify-center rounded-lg">
            ICON
          </div>
        </div>

        {cell.groups && cell.groups.length > 0 && (
          <div className="flex gap-4 mt-2">
            {cell.groups.map((groupId) => {
              const group = mapping.groups?.[groupId] || {
                name: groupId,
                color: 'white',
              }

              return (
                <div key={groupId} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-2 h-full min-h-6 rounded-full flex items-center justify-center box-content',
                      group.color === 'white' && 'outline outline-stone-700'
                    )}
                    style={{
                      backgroundColor: translateColor(group.color) ?? undefined,
                    }}
                  />
                  <div>
                    <p className="font-semibold leading-none text-lg">
                      {group.name}
                    </p>
                    <p className="text-small text-default-500">{group.notes}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {cell.drawings && cell.drawings.length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-2 mt-4 leading-none">
              Drawings
            </h3>
            <div className="flex flex-col gap-3">
              {cell.drawings.map((drawing, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-default-100 w-24 h-24 flex items-center justify-center rounded-lg">
                    AREA {drawing.area?.letter}
                    {drawing.area?.number}
                  </div>
                  <div>
                    <p className="font-semibold">{drawing.name}</p>
                    <p className="text-default-500">{drawing.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}
