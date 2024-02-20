import type { InferGetStaticPropsType } from 'next'

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getArticlesBySearch } from '~/lib/sanity.queries'


export const getServerSideProps = async ({ draftMode = false, query }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const searchTerm = Array.isArray(query.s) ? query.s[0] : query.s

  const articles = await getArticlesBySearch(client, searchTerm)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
    },
  }
}

export default function ListPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const articles = props.articles || [];

  return (
    <Container>
      <section>
        <p>Number of articles: {articles.length || 0}</p>
        { articles.map((article) => <Card key={article._id} article={article} />) }
      </section>
    </Container>
  )
}
