import { zodToJsonSchema } from 'zod-to-json-schema'
import { gameMappingsSchema } from './gameMappingsSchema'

export const gameMappingsJsonSchema = zodToJsonSchema(gameMappingsSchema, {
  name: 'GameMapping',
  target: 'jsonSchema7',
  errorMessages: true,
})
