import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { stories } from './stories'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author , stories],
}
