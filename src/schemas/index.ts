import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import article from './article'
import settings from './settings'

export const schemaTypes = [article, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, article, blockContent],
}
