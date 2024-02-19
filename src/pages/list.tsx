import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { useRouter } from 'next/router';

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getArticles, type Article, articlesQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    articles: Article[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const articles = await getArticles(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
    },
  }
}

export default function ListPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter()
  const { s } = router.query

  const [articles] = useLiveQuery<Article[]>(props.articles, articlesQuery)

  return (
    <Container>
      <section>
        <p>Number of articles: {articles.length || 0}</p>
        { articles.map((article) => <Card key={article._id} article={article} />) }
      </section>
    </Container>
  )
}
