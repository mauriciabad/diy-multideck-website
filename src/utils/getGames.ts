import { getCollection } from 'astro:content'
import { uniqBy } from 'lodash-es'

export async function getGamesCollections() {
  const jsonGames = (await getCollection('games-json')).map((g) => ({
    slug: g.id,
    ...g,
  }))
  const mdGames = await getCollection('games-md')
  const games = uniqBy([...jsonGames, ...mdGames], 'slug')
  return games
}
