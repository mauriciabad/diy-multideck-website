import { z } from 'astro:content'

const dateSchema = z.date({
  required_error: 'Required frontmatter missing: date',
  invalid_type_error:
    'date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.',
})

export const blogSchema = z.object({
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  title: z.string({
    required_error: 'Required frontmatter missing: title',
    invalid_type_error: 'title must be a string',
  }),
  date: dateSchema,
  description: z.optional(z.string()),
  ogImagePath: z.string(),
})

export const gameSchema = z.object({
  game: z.object({
    bgg: z.string().url(),
    rules: z.string().url().optional(),
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
    deckVersion: z.enum(['v0.4b', 'v1']),
  }),
})

export type GameInfo = z.infer<typeof gameSchema>
export type BlogInfo = z.infer<typeof blogSchema>
