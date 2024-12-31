import { z } from 'astro:content'

export const dateSchema = z.date({
  required_error: 'Required frontmatter missing: date',
  invalid_type_error:
    'date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.',
})
