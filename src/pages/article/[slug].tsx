import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getArticle,
  type Article,
  articleBySlugQuery,
  articleSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    article: Article
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const article = await getArticle(client, params.slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      article,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [article] = useLiveQuery(props.article, articleBySlugQuery, {
    slug: props.article.slug.current,
  })

  return (
    <Container>
      <section className="post">
        {article.image ? (
          <Image
            className="post__cover"
            src={urlForImage(article.image).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <h1 className="post__title">{article.title}</h1>
          <p className="post__excerpt">{article.intro}</p>
          <p className="post__date">{formatDate(article._createdAt)}</p>
          <div className="post__content">
            <PortableText value={article.body} />
          </div>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(articleSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/article/${slug}`) || [],
    fallback: 'blocking',
  }
}
