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
  fill: z.string().optional(),
  bgFill: z.string().optional(),
  stroke: strokeSchema.optional(),
  transform: transformSchema.optional(),
})

const iconSchema = iconBaseSchema.extend({
  templateIconId: z.string().optional(),
  srcIconId: z.string().optional(),
})

const iconTemplateSchema = iconBaseSchema.extend({
  templateIconId: z.undefined().optional(),
  srcIconId: z.string(),
})

const drawingSchema = z.object({
  area: z.enum(
    // prettier-ignore
    [
      'A1', 'A2',
      'B1', 'B2', 'B3', 'B4',
      'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
      'D1', 'D2', 'D3', 'D4',
      'E1'
    ]
  ),
  src: z.string(),
  alt: z.string(),
})

const cellBaseSchema = z.object({
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

const cellTemplateSchema = cellBaseSchema.extend({
  templateCellId: z.undefined().optional(),
})

const cellSchema = cellBaseSchema.extend({
  templateCellId: z.string().optional(),
  cardId: z.number(),
  name: z.string(),
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
    return merge(templateIcons?.[icon.templateIconId], icon)
  }
  return icon
}

type GameMappingCellSchema = z.infer<typeof cellSchema>
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
    return merge(templateCells?.[cell.templateCellId], cell)
  }
  return cell
}
