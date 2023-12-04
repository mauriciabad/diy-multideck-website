export const SITE_TITLE = 'DIY Multideck'
export const SITE_DESCRIPTION =
  'The DIY multideck is a deck of 160 poker-sized playing cards that lets you play many games by writing in the cards and using a bit of imagination.'
export const MY_NAME = 'Maurici Abad Gutierrez'

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE)
export const SITE_URL = BASE_URL.origin
