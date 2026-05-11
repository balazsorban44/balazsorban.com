import Head from "next/head"
import { useRouter } from "next/router"

export default function Container(props) {
  const { children, skipHeader, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: "Balázs Orbán — Software Engineer, OSS maintainer.",
    description: `Maintains Auth.js, helped maintain Next.js, currently Tech Lead at Unite AS.`,
    image: "https://balazsorban.com/images/banner.jpg",
    type: "website",
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://balazsorban.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://balazsorban.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Balázs Orbán" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@balazsorban44" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      {skipHeader ? (
        children
      ) : (
        <div className="flex flex-col justify-center px-8 pt-12">
          {children}
        </div>
      )}
    </>
  )
}
