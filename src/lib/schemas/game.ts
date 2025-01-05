import { z } from 'astro:content'
import { dateSchema } from './date'

export const gameSchema = z.object({
  game: z.object({
    bgg: z.string().url(),
    rules: z.union([
      z.string().url().optional(),
      z.array(z.object({ url: z.string().url(), name: z.string() })),
    ]),
    image: z.union([
      z.string().url(),
      z
        .string()
        .regex(
          /^\/images\/games(\/[\w\d-_]+)+\.[\w\d]+$/,
          'Must be a relative path'
        ),
    ]),
    title: z.string(),
    description: z.string(),
    players: z
      .string()
      .regex(/^\d+(-\d+)?$/, 'Must be in format N or N-N')
      .optional(),
    mechanics: z.array(z.string()).optional(),
    time: z
      .string()
      .regex(/^\d+(-\d+)?$/, 'Must be in format N or N-N')
      .optional(),
    complexity: z.number().min(1).max(5).optional(),
    rating: z.number().min(1).max(10).optional(),
    scoreAdjustment: z.number().min(-10).max(10).default(0),
    recommended: z.boolean().default(false),
  }),
  post: z.object({
    date: dateSchema,
    ogImagePath: z.string(),
    draft: z.boolean().default(false),
    keywords: z.optional(z.array(z.string())),
  }),
  mapping: z.object({
    compatibility: z.number().min(0).max(5).step(1),
    requiredCardsCount: z.number().min(0).step(1).max(162),
    requiredDrawingsCount: z
      .number()
      .min(0)
      .step(1)
      .max(162 * 16),
    deckVersion: z.enum(['v0.4b', 'v1', 'v2']),
  }),
})

export type GameInfo = z.infer<typeof gameSchema>
