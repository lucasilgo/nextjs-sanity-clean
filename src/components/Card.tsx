import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Article } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ article }: { article: Article }) {
  return (
    <div className="card">
      {article.image ? (
        <Image
          className="card__cover"
          src={urlForImage(article.image).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <h3 className="card__title">
          <a className="card__link" href={`/article/${article.slug.current}`}>
            {article.title}
          </a>
        </h3>
        <p className="card__excerpt">{article.intro}</p>
        <p className="card__date">{formatDate(article._createdAt)}</p>
      </div>
    </div>
  )
}
