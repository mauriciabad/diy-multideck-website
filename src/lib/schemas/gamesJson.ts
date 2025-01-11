import { z } from 'astro:content'
import { gameSchema } from './game'
import { gameMappingsSchema } from './gameMappingsSchema'

export const gamesJsonSchema = z.intersection(
  gameSchema.strip(),
  gameMappingsSchema.strip()
)

export type GamesJson = z.infer<typeof gamesJsonSchema>
