import { defineCollection } from 'astro:content'
import { blogSchema, gameSchema } from '../lib/schemas'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
  games: defineCollection({
    type: 'content',
    schema: gameSchema,
  }),
}
