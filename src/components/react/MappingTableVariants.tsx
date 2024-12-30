import { Select, SelectItem, type Selection } from '@nextui-org/react'
import { type FC, useMemo, useState } from 'react'
import { type GameMapping } from '../../lib/schemas/gameMappingsSchema'
import { MappingTable } from './MappingTable'
import { cn } from '../../lib/cn'

export const MappingTableVariants: FC<{
  mapping: GameMapping
  classNames?: {
    container?: string
    table?: string
  }
}> = ({ mapping, classNames }) => {
  const [selectedVariant, setSelectedVariant] = useState<Selection>(
    new Set(mapping.variants[0] ? [mapping.variants[0].slug] : [])
  )

  const currentVariant = useMemo(() => {
    if (mapping.variants.length === 0) {
      return null
    }

    if (mapping.variants.length === 1) {
      return mapping.variants[0]
    }

    if (selectedVariant === 'all') {
      return mapping.variants[0] ?? null
    }

    const selectedVariantSlug = Array.from(selectedVariant)[0]
    return mapping.variants.find((v) => v.slug === selectedVariantSlug) ?? null
  }, [selectedVariant, mapping.variants])

  return (
    <div
      className={cn('flex flex-col gap-4 items-center', classNames?.container)}
    >
      {mapping.variants.length >= 2 && (
        <Select
          label="Variant"
          placeholder="Select a variant"
          selectedKeys={selectedVariant}
          onSelectionChange={setSelectedVariant}
          className="mb-4 max-w-xs"
          variant="bordered"
          labelPlacement="outside"
          aria-label="Select mapping variant"
        >
          {mapping.variants.map((variant) => (
            <SelectItem key={variant.slug} value={variant.slug}>
              {variant.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {currentVariant && (
        <MappingTable mapping={currentVariant} className={classNames?.table} />
      )}
    </div>
  )
}
