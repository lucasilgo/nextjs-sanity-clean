import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
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
      <div className="row">

        <div className="col-md-8 offset-md-2">

          <article className="article-show blog-post mt-5">

            <p className="blog-post-meta">{formatDate(article.date || article._createdAt)}</p>

            <h1 className="article-title blog-post-title mb-3">{article.title}</h1>

            {article.intro && <p className="article-preface lead" data-th-if="${intro}">{article.intro}</p>}

            <hr />

            {
              article.image &&
              <figure className="mb-5">
                <img src={urlForImage(article.image).url()} className="img-fluid" alt="Article Image"
                  style={{ width: "856px", height: "480px", objectFit: "cover" }} />
                <figcaption className="figure-caption mt-2">{article.image.caption}</figcaption>
              </figure>
            }

            <PortableText value={article.body} />

          </article>

        </div>

      </div>
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
