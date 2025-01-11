import { z } from 'astro:content'
import { dateSchema } from './date'

export const blogSchema = z.strictObject({
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

export type BlogInfo = z.infer<typeof blogSchema>
