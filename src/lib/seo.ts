type PageMeta = {
  title: string
  description?: string
}

type PageOgMeta = {
  title: string // page title
  description?: string // page description
  type: 'website'
  url?: string // site URL
  publishDate?: string // ISO string
  image?: string // preview image
  imageAlt?: string // alt text for preview image
  imageWidth?: string // preview image width - 1200px standard
  imageHeight?: string // preview image height - 627px standard
}

type PageTwitterMeta = {
  title: string // same as og:title
  description?: string // same as og:description
  card: 'summary_large_image'
  site?: string // twitter handle (@username) of blog owner
  creator?: string // twitter handle (@username) of content owner (usually same as blog owner)
  image?: string // same as og:image
  imageAlt?: string // same as og:image:alt
}

type BlogPostOgMeta = {
  title: string // page title
  description?: string // page description
  type: 'article'
  url?: string // blog post url
  author?: string // post author name
  // siteName?: string; // page title
  publishDate: string // ISO string
  image?: string // preview image
  imageAlt?: string // alt text for preview image
  imageWidth?: string // preview image width - 1200px standard
  imageHeight?: string // preview image height - 627px standard
}

type BlogPostTwitterMeta = {
  title: string // same as blog post og:title
  description?: string // same as blog post og:description
  card: 'summary_large_image'
  site?: string // twitter handle (@username) of blog owner
  creator?: string // twitter handle (@username) of content owner (usually same as blog owner)
  image?: string // same as blog post  og:image
  imageAlt?: string // same as blog post  og:image:alt
}

export function getPageMeta({
  title: pageTitle,
  description,
  baseUrl,
  publishDate,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string
  description: string
  baseUrl?: string
  publishDate?: string
  ogImageAbsoluteUrl?: string // should always be absolute
  ogImageAltText?: string
  ogImageWidth?: number
  ogImageHeight?: number
  siteOwnerTwitterHandle?: string
  contentAuthorTwitterHandle?: string
}): { meta: PageMeta; og: PageOgMeta; twitter: PageTwitterMeta } {
  if (!pageTitle) {
    throw Error('title is required for page SEO')
  }
  if (ogImageAbsoluteUrl) {
    ogImageAltText = !ogImageAltText
      ? `Preview image for ${pageTitle}`
      : ogImageAltText
    // ogImageWidth = !ogImageWidth ? 1200 : ogImageWidth;
    // ogImageHeight = !ogImageHeight ? 627 : ogImageHeight;
  }

  const meta: PageMeta = { title: pageTitle, description }

  const og: PageOgMeta = {
    title: pageTitle,
    description: description,
    type: 'website',
    url: baseUrl,
    publishDate: publishDate,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  }

  const twitter: PageTwitterMeta = {
    title: pageTitle,
    description: description,
    card: 'summary_large_image',
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  }

  return {
    meta,
    og,
    twitter,
  }
}

export function getBlogPostMeta({
  title: pageTitle,
  description,
  pageUrl,
  authorName,
  publishDate,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string
  description: string
  pageUrl?: string
  authorName?: string
  publishDate: string
  ogImageAbsoluteUrl?: string // should always be absolute
  ogImageAltText?: string
  ogImageWidth?: number
  ogImageHeight?: number
  siteOwnerTwitterHandle?: string
  contentAuthorTwitterHandle?: string
}): { meta: PageMeta; og: BlogPostOgMeta; twitter: BlogPostTwitterMeta } {
  if (!pageTitle) {
    throw Error('title is required for page SEO')
  }
  if (ogImageAbsoluteUrl && !ogImageAltText) {
    ogImageAltText = `Preview image for ${pageTitle}`
  }

  const meta: PageMeta = {
    title: pageTitle,
    description: description,
  }

  const og: BlogPostOgMeta = {
    title: pageTitle,
    description: description,
    type: 'article',
    url: pageUrl,
    author: authorName,
    publishDate: publishDate,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  }

  const twitter: BlogPostTwitterMeta = {
    title: pageTitle,
    description: description,
    card: 'summary_large_image',
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  }

  return {
    meta,
    og,
    twitter,
  }
}

type GamePostOgMeta = {
  title: string // page title
  description?: string // page description
  type: 'article'
  url?: string // blog post url
  // siteName?: string; // page title
  publishDate: string // ISO string
  image?: string // preview image
  imageAlt?: string // alt text for preview image
  imageWidth?: string // preview image width - 1200px standard
  imageHeight?: string // preview image height - 627px standard
}

type GamePostTwitterMeta = {
  title: string // same as blog post og:title
  description?: string // same as blog post og:description
  card: 'summary_large_image'
  site?: string // twitter handle (@username) of blog owner
  image?: string // same as blog post  og:image
  imageAlt?: string // same as blog post  og:image:alt
}

export function getGamePostMeta({
  title: pageTitle,
  description,
  pageUrl,
  publishDate,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
}: {
  title: string
  description: string
  pageUrl?: string
  publishDate: string
  ogImageAbsoluteUrl?: string // should always be absolute
  ogImageAltText?: string
  ogImageWidth?: number
  ogImageHeight?: number
}): { meta: PageMeta; og: GamePostOgMeta; twitter: GamePostTwitterMeta } {
  if (!pageTitle) {
    throw Error('title is required for page SEO')
  }
  if (ogImageAbsoluteUrl && !ogImageAltText) {
    ogImageAltText = `Preview image for ${pageTitle}`
  }

  const meta: PageMeta = {
    title: pageTitle,
    description: description,
  }

  const og: BlogPostOgMeta = {
    title: pageTitle,
    description: description,
    type: 'article',
    url: pageUrl,
    publishDate: publishDate,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  }

  const twitter: BlogPostTwitterMeta = {
    title: pageTitle,
    description: description,
    card: 'summary_large_image',
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  }

  return {
    meta,
    og,
    twitter,
  }
}
