import Link from "next/link"
import { Link as StyledLink } from "components/link"

import type { Blog } from ".contentlayer/types"

export default function BlogPost({
  title,
  summary,
  slug,
}: Pick<Blog, "title" | "summary" | "slug">) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <StyledLink className="ml-0 mr-0 w-full font-sans font-normal border-white border-2 pb-2">
        <h4 className="w-full text-lg font-medium md:text-xl pb-2">{title}</h4>
        <p>{summary}</p>
      </StyledLink>
    </Link>
  )
}
