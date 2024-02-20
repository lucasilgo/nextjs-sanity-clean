/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import {
  defineUrlResolver,
  Iframe,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import { presentationTool } from 'sanity/presentation'
import { settingsPlugin, settingsStructure } from '~/plugins/settings'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { schema } from '~/schemas'
import { structureTool } from 'sanity/structure'
import settingsType from '~/schemas/settings'

const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug: ['article'],
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  name: 'seeds-demo',
  title: 'Seeds',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    structureTool({
      structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        return S.document().views([
          // Default form view
          S.view.form(),
          // Preview
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      },
    }),
    // Add the "Open preview" action
    previewUrl({
      base: '/api/draft',
      requiresSlug: ['article'],
      urlSecretId: previewSecretId,
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/'//'/api/draft'
        },
      },
    }),
    settingsPlugin({ type: 'settings' }),
  ],
})
