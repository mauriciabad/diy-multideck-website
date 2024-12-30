import { Card, CardBody, CardHeader } from '@nextui-org/react'
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
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Card #{cell.cardId}</p>
          <p className="text-small text-default-500">{cell.name}</p>
        </div>
      </CardHeader>
      <CardBody>
        {cell.notes && (
          <div className="mb-3">
            <p className="font-semibold">Notes:</p>
            <p className="text-default-500">{cell.notes}</p>
          </div>
        )}

        {cell.drawings && cell.drawings.length > 0 && (
          <div className="mb-3">
            <p className="font-semibold">Drawings:</p>
            <ul className="list-disc list-inside">
              {cell.drawings.map((drawing, i) => (
                <li key={i} className="text-default-500">
                  {drawing.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {cell.groups && cell.groups.length > 0 && (
          <div>
            <p className="font-semibold">Groups:</p>
            <div className="flex gap-2 flex-wrap">
              {cell.groups.map((groupId) => {
                const group = mapping.groups?.[groupId]
                if (!group) return null
                return (
                  <div
                    key={groupId}
                    className="px-2 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: translateColor(group.color) ?? undefined,
                      color: group.color === 'white' ? '#000' : '#fff',
                    }}
                  >
                    {group.name}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
