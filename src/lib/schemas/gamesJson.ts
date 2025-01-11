import { z } from 'astro:content'
import { gameSchema } from './game'
import { gameMappingsSchema } from './gameMappingsSchema'

export const gamesJsonSchema = gameSchema.merge(gameMappingsSchema).strict()

export type GamesJson = z.infer<typeof gamesJsonSchema>
