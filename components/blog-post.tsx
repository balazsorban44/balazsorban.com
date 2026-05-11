import Link from "next/link"

import type { Blog } from "contentlayer2/generated"

export default function BlogPost({
  title,
  summary,
  slug,
}: Pick<Blog, "title" | "summary" | "slug">) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group mb-4 block w-full rounded-md border border-rune/20 bg-surface/30 p-4 transition hover:border-ember hover:bg-surface/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/50"
    >
      <h4 className="pb-2 text-lg font-medium text-ink md:text-xl group-hover:text-ember">
        <span className="rune mr-2 text-ember/80">ᛟ</span>
        {title}
      </h4>
      <p className="text-muted">{summary}</p>
    </Link>
  )
}
