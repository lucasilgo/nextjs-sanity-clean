import type { GetStaticProps } from 'next'

import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import type { SharedPageProps } from '~/pages/_app'
import { getClient } from '~/lib/sanity.client'
import { getSettings } from '~/lib/sanity.queries'
import Head from 'next/head';

export const getStaticProps: GetStaticProps<
  SharedPageProps
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const settings = await getSettings(client)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      settings
    },
  }
}

export default function IndexPage(props) {
  const pageTitle = props.settings.title
  return (
    <>
      <Head><title>{pageTitle}</title></Head>
      <Container>
        <section>
          <Welcome />
        </section>
      </Container>
    </>
  )
}
