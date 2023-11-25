// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'DIY Multideck'
export const SITE_DESCRIPTION =
  'The DIY multideck is a deck of 120 poker-sized playing cards that lets you play many games by writing in the cards and using a bit of imagination.'
export const TWITTER_HANDLE = '@diymultideck'
export const MY_NAME = 'DIY Multideck'

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE)
export const SITE_URL = BASE_URL.origin
