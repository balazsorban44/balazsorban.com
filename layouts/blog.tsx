import Image from "next/image"
import { parseISO, format } from "date-fns"

import Container from "components/container"
import ViewCounter from "components/view-counter"
import type { PropsWithChildren } from "react"
import type { Blog } from ".contentlayer/types"
import { Link } from "components/link"

const editUrl = (slug) =>
  `https://github.com/balazsorban44/balazsorban.com/edit/main/data/blog/${slug}.mdx`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://balazsorban.com/blog/${slug}`
  )}`

export default function BlogLayout(props: PropsWithChildren<{ post: Blog }>) {
  const { children, post } = props
  return (
    <Container
      title={`${post.title} - Balázs Orbán`}
      description={post.summary}
      image={`https://balazsorban.com${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-2">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Balázs Orbán"
              height={24}
              width={24}
              src="/images/me.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm">
              {"Balázs Orbán / "}
              {format(parseISO(post.publishedAt), "yyyy MMMM dd")}
            </p>
          </div>
          <p className="mt-2 text-sm min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 prose max-w-none">{children}</div>
      </article>
    </Container>
  )
}
