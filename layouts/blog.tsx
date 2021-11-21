import Image from "next/image"
import { parseISO, format } from "date-fns"

import Container from "components/container"
import ViewCounter from "components/view-counter"
import type { PropsWithChildren } from "react"
import type { Blog } from ".contentlayer/types"

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
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Balázs Orbán"
              height={24}
              width={24}
              src="/me.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700">
              {"Balázs Orbán / "}
              {format(parseISO(post.publishedAt), "yyyy MMMM dd")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 prose max-w-none">{children}</div>
        <div className="text-sm text-gray-700">
          <a
            href={discussUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Discuss on Twitter"}
          </a>
          {` • `}
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Edit on GitHub"}
          </a>
        </div>
      </article>
    </Container>
  )
}
