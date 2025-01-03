import { Card, CardBody } from '@nextui-org/react'
import { useMemo, type FC } from 'react'
import Markdown from 'react-markdown'
import { cn } from '../../lib/cn'
import {
  getFullCell,
  type GameMappingVariant,
} from '../../lib/schemas/gameMappingsSchema'
import { translateColor } from '../../lib/utils/mappingUtils'
import { Cell } from './Cell'

export const CellDetailsPanel: FC<{
  cardId: number
  mapping: GameMappingVariant
  className?: string
}> = ({ cardId, mapping, className }) => {
  const cell = useMemo(() => getFullCell(cardId, mapping), [cardId, mapping])

  if (!cell) {
    return (
      <Card className={cn('w-full light mb-32', className)}>
        <CardBody>
          <p className="text-default-800 text-center text-lg font-bold mb-2">
            Unused card
          </p>
          <p className="text-default-500 text-center text-sm">
            <span className="hidden sm:inline">Click</span>
            <span className="sm:hidden">Tap</span> another cell for more details
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className={cn('w-full light', className)}>
      <CardBody className="block">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold leading-none sm:leading-none text-pretty">
              {cell.name}
            </h2>
            <Markdown className="prose-sm text-sm sm:text-base leading-snug sm:leading-snug text-default-500 text-pretty">
              {cell.notes}
            </Markdown>
          </div>
          <Cell
            cardId={cell.cardId}
            mapping={mapping}
            className="size-14 shrink-0 self-start"
          />
        </div>

        {cell.groups && cell.groups.length > 0 && (
          <div className="flex flex-col gap-3 mt-2 mb-4">
            {cell.groups.map((groupId) => {
              const group = mapping.groups?.[groupId] || {
                name: groupId,
                color: 'white',
              }

              return (
                <div key={groupId} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-2 self-stretch min-h-6 rounded-full box-content',
                      group.color === 'white' && 'outline outline-stone-700'
                    )}
                    style={{
                      backgroundColor: translateColor(group.color) ?? undefined,
                    }}
                  />
                  <div>
                    <p className="font-semibold leading-none text-lg text-pretty">
                      {group.name}
                    </p>
                    <p className="text-small text-default-500 leading-tight text-pretty">
                      {group.notes}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {cell.drawings && cell.drawings.length > 0 && (
          <div className="flex flex-col gap-2 my-4">
            {cell.drawings.map((drawing, index) => (
              <div key={index} className="flex items-start gap-3">
                {drawing.area ? (
                  <img
                    src={`/images/drawing-areas/usage/${drawing.area?.letter}.svg`}
                    alt={`Drawing area ${drawing.area?.letter}${drawing.area?.number}`}
                    className="w-16"
                  />
                ) : (
                  <div className="w-16" />
                )}
                <div>
                  <p className="font-semibold text-pretty leading-tight">
                    {drawing.name}
                  </p>
                  <Markdown className="prose-sm prose-p:my-1 prose-ul:my-1 prose-ul:pl-1 prose-li:pl-1 prose-ul:list-disc prose-ul:list-inside text-default-500 leading-tight text-pretty">
                    {drawing.notes}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
