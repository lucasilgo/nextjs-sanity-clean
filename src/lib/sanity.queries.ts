import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const articlesQuery = groq`*[_type == "article" && defined(slug.current)] | order(_createdAt desc)`

export async function getArticles(client: SanityClient): Promise<Article[]> {
  return await client.fetch(articlesQuery)
}

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]`

export async function getArticle(
  client: SanityClient,
  slug: string,
): Promise<Article> {
  return await client.fetch(articleBySlugQuery, {
    slug,
  })
}

export const articleSlugsQuery = groq`
*[_type == "article" && defined(slug.current)][].slug.current
`

export interface Article {
  _type: 'article'
  _id: string
  _createdAt: string
  title: string
  slug: Slug
  date: Date
  intro?: string
  image?: ImageAsset
  body: PortableTextBlock[]
}
