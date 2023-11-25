import rss from '@astrojs/rss'
import { blogSchema } from '../lib/markdoc/frontmatter.schema'
import { readAll } from '../lib/markdoc/read'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../config'

export const get = async () => {
  const posts = await readAll({
    directory: 'blog',
    frontmatterSchema: blogSchema,
  })

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  )

  let baseUrl = SITE_URL
  // removing trailing slash if found
  // https://example.com/ => https://example.com
  baseUrl = baseUrl.replace(/\/+$/g, '')

  const rssItems = sortedPosts.map(({ frontmatter, slug }) => {
    const title = frontmatter.title
    const pubDate = frontmatter.date
    const description = frontmatter.description
    const link = `${baseUrl}/blog/${slug}`

    return {
      title,
      pubDate,
      description,
      link,
    }
  })

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: baseUrl,
    items: rssItems,
  })
}
