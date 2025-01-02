import { z } from 'astro:content'
import merge from 'lodash/merge'
import { COLOR_MAPPINGS } from '../utils/mappingUtils'

const colorRegex =
  /^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{8}|#[0-9A-Fa-f]{4}|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*(?:0|1|0?\.\d+))?\s*\))$/

const namedColors = Object.keys(
  COLOR_MAPPINGS
) as (keyof typeof COLOR_MAPPINGS)[]

const baseColorSchema = z.string().refine(
  (color) => namedColors.includes(color as any) || colorRegex.test(color),
  (val) => ({
    message: `Invalid color format: ${val}. Must be a hex color, rgba color, or one of the named colors: ${namedColors.join(
      ', '
    )}`,
  })
)

const colorWithRainbowSchema = z.union([baseColorSchema, z.literal('rainbow')])
const colorSchema = baseColorSchema

const strokeSchema = z.object({
  width: z.number().min(0).optional(),
  color: colorSchema.optional(),
})

const transformSchema = z.object({
  scale: z.number().min(0).optional(),
  translateX: z.number().optional(),
  translateY: z.number().optional(),
  rotate: z.number().optional(),
})

const iconBaseSchema = z.object({
  srcIconId: z.string().min(1),
  fill: colorWithRainbowSchema.optional(),
  bgFill: colorSchema.optional(),
  stroke: strokeSchema.optional(),
  transform: transformSchema.optional(),
})

const iconSchema = iconBaseSchema.partial().extend({
  templateIconId: z.string().min(1).optional(),
})

const iconTemplateSchema = iconBaseSchema.extend({
  templateIconId: z.undefined().optional(),
})

const drawingBaseSchema = z.object({
  area: z.discriminatedUnion('letter', [
    z.object({
      letter: z.literal('A'),
      number: z.union([z.literal(1), z.literal(2)]).optional(),
    }),
    z.object({
      letter: z.literal('B'),
      number: z
        .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
        .optional(),
    }),
    z.object({
      letter: z.literal('C'),
      number: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
      ]),
    }),
    z.object({
      letter: z.literal('D'),
      number: z
        .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
        .optional(),
    }),
    z.object({
      letter: z.literal('E'),
      number: z.literal(1).optional(),
    }),
  ]),
  name: z.string().min(1),
  notes: z.string().optional(),
})

const drawingSchema = drawingBaseSchema.partial().extend({
  templateDrawingId: z.string().min(1).optional(),
})

const drawingTemplateSchema = drawingBaseSchema.extend({
  templateDrawingId: z.undefined().optional(),
})

const cellBaseSchema = z.object({
  name: z.string().min(1),
  notes: z.string().optional(),
  bgFill: colorSchema.optional(),
  icon: iconSchema.optional(),
  emoji: z
    .object({
      content: z.string().min(1),
      transform: transformSchema.optional(),
    })
    .optional(),
  text: z
    .object({
      content: z.string().min(1),
      size: z.number().min(0).optional(),
      fill: colorSchema.optional(),
      stroke: strokeSchema.optional(),
      transform: transformSchema.optional(),
      weight: z
        .enum([
          'thin',
          'light',
          'normal',
          'medium',
          'semi-bold',
          'bold',
          'black',
        ])
        .optional(),
    })
    .optional(),
  drawings: z.array(drawingSchema).optional(),
  groups: z.array(z.string().min(1)).optional(),
})

const cellTemplateSchema = cellBaseSchema.partial().extend({
  templateCellId: z.undefined().optional(),
})

const cellSchema = cellBaseSchema.partial().extend({
  templateCellId: z.string().min(1).optional(),
  cardId: z.number().int().min(0),
})

const groupSchema = z.object({
  name: z.string().min(1),
  notes: z.string().optional(),
  color: colorSchema,
  icon: iconSchema.optional(),
  emoji: z.string().min(1).optional(),
})

const variantSchema = z
  .object({
    name: z.string().min(1),
    slug: z
      .string()
      .min(1)
      .regex(
        /^[a-z0-9-]+$/,
        'Slug must be lowercase alphanumeric with hyphens'
      ),
    description: z.string().optional(),
    cells: z.array(cellSchema).min(1),
    notes: z.string().optional(),
    groups: z.record(groupSchema).optional(),
    templateDrawings: z.record(drawingTemplateSchema).optional(),
    templateIcons: z.record(iconTemplateSchema).optional(),
    templateCells: z.record(cellTemplateSchema).optional(),
    layout: z.enum(['basic', '3d', '3d-alt', 'number']),
  })
  .refine(
    (variant) => {
      const templateIconIds = variant.templateIcons
        ? Object.keys(variant.templateIcons)
        : []
      const templateDrawingIds = variant.templateDrawings
        ? Object.keys(variant.templateDrawings)
        : []
      const templateCellIds = variant.templateCells
        ? Object.keys(variant.templateCells)
        : []
      const groupIds = variant.groups ? Object.keys(variant.groups) : []

      const errors: string[] = []

      const cardIds = new Set<number>()
      for (const cell of variant.cells) {
        if (cardIds.has(cell.cardId)) {
          errors.push(`Duplicate cardId found: ${cell.cardId}`)
        }
        cardIds.add(cell.cardId)
      }

      for (const cell of variant.cells) {
        if (
          cell.templateCellId &&
          !templateCellIds.includes(cell.templateCellId)
        ) {
          errors.push(
            `Cell template "${cell.templateCellId}" not found in templateCells`
          )
        }

        if (
          cell.icon?.templateIconId &&
          !templateIconIds.includes(cell.icon.templateIconId)
        ) {
          errors.push(
            `Icon template "${cell.icon.templateIconId}" not found in templateIcons`
          )
        }

        if (cell.drawings) {
          for (const drawing of cell.drawings) {
            if (
              drawing.templateDrawingId &&
              !templateDrawingIds.includes(drawing.templateDrawingId)
            ) {
              errors.push(
                `Drawing template "${drawing.templateDrawingId}" not found in templateDrawings`
              )
            }
          }
        }

        if (cell.groups) {
          for (const groupId of cell.groups) {
            if (!groupIds.includes(groupId)) {
              errors.push(`Group "${groupId}" not found in groups`)
            }
          }
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join('\n'))
      }

      return true
    },
    {
      message: 'Invalid template or group references found',
    }
  )

export const gameMappingsSchema = z.object({
  variants: z.array(variantSchema).min(1),
})

export type GameMappingVariant = z.infer<typeof variantSchema>
export type GameMapping = z.infer<typeof gameMappingsSchema>

export type GameMappingIconSchema = z.infer<typeof iconSchema>
type GameMappingIconTemplatesSchema = z.infer<
  typeof variantSchema
>['templateIcons']

export function fillIconFromTemplate(
  icon: GameMappingIconSchema,
  templateIcons: GameMappingIconTemplatesSchema
): GameMappingIconSchema
export function fillIconFromTemplate(
  icon: GameMappingIconSchema | undefined,
  templateIcons: GameMappingIconTemplatesSchema
): GameMappingIconSchema | undefined
export function fillIconFromTemplate(
  icon: GameMappingIconSchema | undefined,
  templateIcons: GameMappingIconTemplatesSchema
) {
  if (!icon) return undefined
  if (icon.templateIconId) {
    return merge({}, templateIcons?.[icon.templateIconId], icon)
  }
  return icon
}

export type GameMappingCellSchema = z.infer<typeof cellSchema>
type GameMappingCellTemplatesSchema = z.infer<
  typeof variantSchema
>['templateCells']

export function fillCellFromTemplate(
  cell: GameMappingCellSchema,
  templateCells: GameMappingCellTemplatesSchema
): GameMappingCellSchema
export function fillCellFromTemplate(
  cell: GameMappingCellSchema | undefined,
  templateCells: GameMappingCellTemplatesSchema
): GameMappingCellSchema | undefined
export function fillCellFromTemplate(
  cell: GameMappingCellSchema | undefined,
  templateCells: GameMappingCellTemplatesSchema
) {
  if (!cell) return undefined
  if (cell.templateCellId) {
    return merge({}, templateCells?.[cell.templateCellId], cell)
  }
  return cell
}

type GameMappingDrawingSchema = z.infer<typeof drawingSchema>
type GameMappingDrawingTemplatesSchema = z.infer<
  typeof variantSchema
>['templateDrawings']

export function fillDrawingFromTemplate(
  drawing: GameMappingDrawingSchema,
  templateDrawings: GameMappingDrawingTemplatesSchema
): GameMappingDrawingSchema
export function fillDrawingFromTemplate(
  drawing: GameMappingDrawingSchema | undefined,
  templateDrawings: GameMappingDrawingTemplatesSchema
): GameMappingDrawingSchema | undefined
export function fillDrawingFromTemplate(
  drawing: GameMappingDrawingSchema | undefined,
  templateDrawings: GameMappingDrawingTemplatesSchema
) {
  if (!drawing) return undefined
  if (drawing.templateDrawingId) {
    return merge({}, templateDrawings?.[drawing.templateDrawingId], drawing)
  }
  return drawing
}

export function getFullCell(cardId: number, mapping: GameMappingVariant) {
  const originalCell = mapping.cells.find((cell) => cell.cardId === cardId)
  if (!originalCell) return undefined
  const mergedCell = fillCellFromTemplate(originalCell, mapping.templateCells)

  return {
    ...mergedCell,
    cardId,
    icon: fillIconFromTemplate(mergedCell?.icon, mapping.templateIcons),
    drawings: mergedCell?.drawings?.map((drawing) =>
      fillDrawingFromTemplate(drawing, mapping.templateDrawings)
    ),
  }
}
