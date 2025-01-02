import { defineCollection } from 'astro:content'
import { gameMappingsSchema } from '../lib/schemas/gameMappingsSchema'
import { blogSchema } from '../lib/schemas/blog'
import { gameSchema } from '../lib/schemas/game'
import { gamesJsonSchema } from '../lib/schemas/gamesJson'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
  'games-md': defineCollection({
    type: 'content',
    schema: gameSchema,
  }),
  'games-json': defineCollection({
    type: 'data',
    schema: gamesJsonSchema,
  }),
  gameMappings: defineCollection({
    type: 'data',
    schema: gameMappingsSchema,
  }),
}
