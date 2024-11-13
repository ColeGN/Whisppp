import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { stories } from './stories'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author , stories , playlist],
}
