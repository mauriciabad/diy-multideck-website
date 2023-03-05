import { z } from "zod";

const dateSchema = z.date({
  required_error: "Required frontmatter missing: date",
  invalid_type_error:
    "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
})

export const blogSchema = z.object({
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: dateSchema,
  description: z.optional(z.string()),
  ogImagePath: z.optional(z.string()),
  canonicalUrl: z.optional(z.string()),
});

export const gameSchema = z.object({
  game: z.object({
    bgg: z.string().url(),
    rules: z.string().url().optional(),
    image: z.union([z.string().url(), z.string().regex(/^\/images\/games(\/[\w\d-_]+)+\.[\w\d]+$/, 'Must be a relative path')]),
    title: z.string(),
    description: z.string(),
    players: z.string().regex(/\d+-\d+/, "Must be in format N-N"),
    mechanics: z.array(z.string()),
    time: z.number().min(1),
    complexity: z.number().min(0).max(5),
  }),
  post: z.object({
    date: dateSchema,
    ogImagePath: z.optional(z.string()),
    draft: z.boolean().default(false),
    keywords: z.optional(z.array(z.string())),
  }),
  mapping: z.object({
    compatibility: z.number().min(0).max(5).step(1),
    requiredCardsCount: z.number().min(0).step(1).max(120),
    requiredDrawingsCount: z.number().min(0).step(1).max(120 * 16),
    deckVersion: z.enum(['v0.4b']),
  }),
});
