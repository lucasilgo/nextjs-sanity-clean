import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head';

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getArticlesBySearch, getSettings } from '~/lib/sanity.queries'


export const getServerSideProps = async ({ draftMode = false, query }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const searchTerm = Array.isArray(query.s) ? query.s[0] : query.s

  const articles = await getArticlesBySearch(client, searchTerm)
  const settings = await getSettings(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      settings
    },
  }
}

export default function ListPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const pageTitle = props.settings.title
  const articles = props.articles || []

  return (
    <>
      <Head><title>{pageTitle}</title></Head>
      <Container>
        <section>
          <p>Number of articles: {articles.length || 0}</p>
          { articles.map((article) => <Card key={article._id} article={article} />) }
        </section>
      </Container>
    </>
  )
}
