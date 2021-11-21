// import { useMDXComponent } from "next-contentlayer/hooks"
// import components from "components/mdx-components"
// import BlogLayout from "layouts/blog"
import { allBlogs } from ".contentlayer/data"
import type { Blog } from ".contentlayer/types"

export default function Post({ post }: { post: Blog }) {
  return null
  // const Component = useMDXComponent(post.body.code)

  // return (
  //   <BlogLayout post={post}>
  //     <Component components={components} />
  //   </BlogLayout>
  // )
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  console.log(post)

  return { props: { post } }
}
