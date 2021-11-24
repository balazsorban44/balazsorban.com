import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import NextLink from "next/link"
import { Link as StyledLink } from "components/link"

function NavItem({ href, text }) {
  const router = useRouter()
  const isActive = href !== "/" && router.asPath.startsWith(href)

  return (
    <NextLink href={href} passHref>
      <StyledLink className={isActive ? "bg-main" : undefined}>
        {text}
      </StyledLink>
    </NextLink>
  )
}

export default function Container(props) {
  const [, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const { children, skipHeader, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: "Balázs Orbán - Software Engineer, OSS maintainer.",
    description: `Maintains Next.js, NextAuth.js and React.js Hungarian docs.`,
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
        <>
          <nav className="flex justify-center w-full pt-8 pb-8 sm:pb-16 gap-8">
            <a href="#skip" className="skip-nav">
              Skip to content
            </a>
            <NavItem href="/" text="Home" />
            <NavItem href="/blog" text="Blog" />
          </nav>
          <div id="skip" className="flex flex-col justify-center px-8">
            {children}
          </div>
        </>
      )}
    </>
  )
}
