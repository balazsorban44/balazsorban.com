import Link from "next/link"
import { linkClassName } from "components/link"

import type { Blog } from "contentlayer2/generated"

export default function BlogPost({
  title,
  summary,
  slug,
}: Pick<Blog, "title" | "summary" | "slug">) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`${linkClassName} ml-0 mr-0 w-full font-sans font-normal border-2 pb-2 mb-4`}
    >
      <h4 className="w-full text-lg font-medium md:text-xl pb-2">{title}</h4>
      <p>{summary}</p>
    </Link>
  )
}
