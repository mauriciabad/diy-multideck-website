import type { FC } from 'react'
import { cn } from '../../lib/cn'
import {
  type GameMappingVariant,
  mergeIcon,
} from '../../lib/schemas/gameMappingsSchema'
import { Icon } from '@iconify/react'

type Props = {
  mapping: GameMappingVariant
  className?: string
}

export const MappingTable: FC<Props> = ({ mapping, className }) => {
  return (
    <div className={cn('not-prose bg-stone-100 p-4 rounded-lg', className)}>
      <div className="grid grid-cols-10 gap-2">
        {mapping.cells.map((cell, index) => {
          const mergedIcon = cell.icon
            ? mergeIcon(cell.icon, mapping.templateIcons)
            : null

          return (
            <div
              key={`${cell.cardId}-${index}`}
              className="flex flex-col items-center justify-center p-2 bg-white rounded shadow"
            >
              {mergedIcon && (
                <Icon
                  icon={mergedIcon.srcIconId}
                  className="w-8 h-8"
                  style={{ color: mergedIcon.fill }}
                />
              )}
              <span className="text-sm mt-1">{cell.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
