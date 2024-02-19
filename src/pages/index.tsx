import type { GetStaticProps } from 'next'

import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps
> = async ({ draftMode = false }) => {
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : ''
    },
  }
}

export default function IndexPage() {
  return (
    <Container>
      <section>
        <Welcome />
      </section>
    </Container>
  )
}
