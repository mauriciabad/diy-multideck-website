import { z } from 'astro:content'
import { merge } from 'lodash'

const strokeSchema = z.object({
  width: z.number().optional(),
  color: z.string().optional(),
})

const transformSchema = z.object({
  scale: z.number().optional(),
  translateX: z.number().optional(),
  translateY: z.number().optional(),
  rotate: z.number().optional(),
})

const iconBaseSchema = z.object({
  srcIconId: z.string(),
  fill: z.string().optional(),
  bgFill: z.string().optional(),
  stroke: strokeSchema.optional(),
  transform: transformSchema.optional(),
})

const iconSchema = iconBaseSchema.partial().extend({
  templateIconId: z.string().optional(),
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
  description: z.string(),
})

const drawingSchema = drawingBaseSchema.partial().extend({
  templateDrawingId: z.string().optional(),
})

const drawingTemplateSchema = drawingBaseSchema.extend({
  templateDrawingId: z.undefined().optional(),
})

const cellBaseSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  bgFill: z.string().optional(),
  icon: iconSchema.optional(),
  emoji: z
    .object({
      content: z.string(),
      transform: transformSchema.optional(),
    })
    .optional(),
  text: z
    .object({
      content: z.string(),
      size: z.number().optional(),
      fill: z.string().optional(),
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
  groups: z.array(z.string()).optional(),
})

const cellTemplateSchema = cellBaseSchema.partial().extend({
  templateCellId: z.undefined().optional(),
})

const cellSchema = cellBaseSchema.partial().extend({
  templateCellId: z.string().optional(),
  cardId: z.number(),
})

const groupSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  color: z.string(),
  icon: iconSchema.optional(),
  emoji: z.string().optional(),
})

const variantSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  cells: z.array(cellSchema),
  notes: z.string().optional(),
  groups: z.record(groupSchema).optional(),
  templateDrawings: z.record(drawingTemplateSchema).optional(),
  templateIcons: z.record(iconTemplateSchema).optional(),
  templateCells: z.record(cellTemplateSchema).optional(),
  layout: z.enum(['basic', '3d', '3d-alt', 'number']),
})

export const gameMappingsSchema = z.object({
  variants: z.array(variantSchema),
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
