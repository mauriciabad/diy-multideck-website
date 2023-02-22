import { z } from "zod";

const baseSchema = z.object({
  featured: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  description: z.optional(z.string()),
  ogImagePath: z.optional(z.string()),
  canonicalUrl: z.optional(z.string()),
});

export const blog = baseSchema.extend({

})

export const game = baseSchema.extend({
  game: z.object({
    bgg: z.string().url(),
    image: z.string().url(),
    name: z.string(),
    description: z.string(),
    requiredCardsCount: z.number().min(0).step(1).max(120)
  })
});
