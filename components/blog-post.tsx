import Link from "next/link"

import type { Blog } from ".contentlayer/types"

export default function BlogPost({
  title,
  summary,
  slug,
}: Pick<Blog, "title" | "summary" | "slug">) {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full border-2 p-4">
        <h4 className="w-full text-lg font-medium md:text-xl">{title}</h4>
        <p>{summary}</p>
      </a>
    </Link>
  )
}
