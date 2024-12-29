import { z } from 'astro:content'

const strokeSchema = z.object({
  width: z.number(),
  color: z.string(),
})

const transformSchema = z.object({
  scale: z.string().optional(),
  translateX: z.string().optional(),
  translateY: z.string().optional(),
  rotate: z.string().optional(),
})

const iconSchema = z.object({
  srcIconId: z.string(),
  fill: z.string().optional(),
  bgFill: z.string().optional(),
  stroke: strokeSchema.optional(),
  transform: transformSchema.optional(),
})

const iconFromTemplateSchema = z.object({
  templateIconId: z.string(),
  fill: z.string().optional(),
  bgFill: z.string().optional(),
  stroke: strokeSchema.optional(),
  transform: transformSchema.optional(),
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

const cellSchema = z.object({
  cardId: z.number(),
  name: z.string(),
  notes: z.string().optional(),
  bgFill: z.string().optional(),
  icon: z.union([iconSchema, iconFromTemplateSchema]).optional(),
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
    })
    .optional(),
  drawings: z.array(drawingSchema).optional(),
  groups: z.array(z.string()).optional(),
})

const groupSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  color: z.string(),
  icon: z.union([iconSchema, iconFromTemplateSchema]).optional(),
  emoji: z.string().optional(),
})

const variantSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  cells: z.array(cellSchema),
  notes: z.string().optional(),
  groups: z.record(groupSchema).optional(),
  templateIcons: z.record(iconSchema).optional(),
  layout: z.enum(['basic', '3d', '3d-alt', 'sequential']),
})

export const gameMappingsSchema = z.object({
  variants: z.array(variantSchema),
})

export type GameMappingVariant = z.infer<typeof variantSchema>
export type GameMapping = z.infer<typeof gameMappingsSchema>
