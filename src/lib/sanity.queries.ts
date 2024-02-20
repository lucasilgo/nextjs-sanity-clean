import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const articlesQuery = groq`*[_type == "article" && defined(slug.current)] | order(_createdAt desc) | order(date desc)`

export async function getArticles(client: SanityClient): Promise<Article[]> {
  return await client.fetch(articlesQuery)
}

export const articlesBySearch = groq`*[_type == "article" && title match "*" + $term + "*"] | order(_createdAt desc) | order(date desc)`
export async function getArticlesBySearch(client: SanityClient, term: string): Promise<Article[]> {
  return term ? await client.fetch(articlesBySearch, { term }) : getArticles(client)
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

export const settingsQuery = groq`*[_type == "settings"][0]`
export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export interface Article {
  _type: 'article'
  _id: string
  _createdAt: string
  title: string
  slug: Slug
  date: string
  intro?: string
  image?: ImageAsset & { caption: string }
  body: PortableTextBlock[]
}

export interface Settings {
  title?: string
}
