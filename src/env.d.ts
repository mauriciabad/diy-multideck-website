/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { GameInfo } from './lib/schemas/game'
import type { GamesJson } from './lib/schemas/gamesJson'

declare module 'astro:content' {
  interface ContentCollections {
    'games-md': {
      type: 'content'
      schema: GameInfo
    }
    'games-json': {
      type: 'data'
      schema: GamesJson
    }
  }

  type ContentEntryMap = {
    'games-md': CollectionEntry<'games-md'>
  }

  type DataEntryMap = {
    'games-json': CollectionEntry<'games-json'>
  }
}
