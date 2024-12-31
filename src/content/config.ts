import { defineCollection } from 'astro:content'
import { gameMappingsSchema } from '../lib/schemas/gameMappingsSchema'
import { blogSchema } from '../lib/schemas/blog'
import { gameSchema } from '../lib/schemas/game'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
  games: defineCollection({
    type: 'content',
    schema: gameSchema,
  }),
  gameMappings: defineCollection({
    type: 'data',
    schema: gameMappingsSchema,
  }),
}
