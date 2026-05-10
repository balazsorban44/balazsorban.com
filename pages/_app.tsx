import { Divider } from "components/dividier"
import { Link } from "components/link"
import { HowlingWolf } from "components/howling-wolf"
import { MusicToggle } from "components/music-toggle"
import "styles/global.css"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { linkClassName } from "components/link"
import { useAnalytics } from "lib/analytics"

const meta = {
  title: "Balázs Orbán",
  description: `JavaScript open sourcerer • hobby photographer.`,
  type: "website",
}

/**
 * A thin runestone band across the very top of the viewport: the Elder
 * Futhark alphabet repeated in tiny ember letters, sitting on a 1-px
 * line of the same colour.
 */
const FUTHARK = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"
function RuneStrip() {
  // Plenty of repeats to span any reasonable viewport width.
  const text = (FUTHARK + " ").repeat(16)
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 select-none"
    >
      <div
        className="rune overflow-hidden whitespace-nowrap px-2 pt-[2px] text-ember"
        style={{ fontSize: 9, letterSpacing: "0.35em", lineHeight: "12px" }}
      >
        {text}
      </div>
      <div className="h-px w-full bg-ember" />
    </div>
  )
}

export default function App({ Component, pageProps }) {
  useAnalytics()

  const router = useRouter()
  const onArticles = router.asPath.startsWith("/blog")

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@balazsorban44" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="theme-color" content="#070a08" />
      </Head>

      <a href="#skip" className="skip-nav">
        Skip to content
      </a>

      <RuneStrip />

      <div className="fixed top-4 right-4 z-40 flex items-center gap-3">
        <NextLink
          href={onArticles ? "/" : "/blog"}
          className={`${linkClassName} text-sm`}
        >
          {onArticles ? "Home" : "Articles"}
        </NextLink>
      </div>

      <HowlingWolf
        className="pointer-events-none fixed bottom-9 left-2 z-10 text-black drop-shadow-[0_0_18px_rgb(var(--ember)/0.18)]"
        size={140}
      />

      <main
        id="skip"
        className="px-4 pt-4 pb-2 flex items-stretch justify-center flex-col flex-1 min-h-0"
      >
        <Component {...pageProps} />
      </main>

      <footer className="relative z-10 mb-4 mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 text-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/balazsorban44"
            aria-label="Social — Twitter / X"
          >
            <span className="rune mr-1 text-ember" aria-hidden="true">
              ᚱ
            </span>
            Social
          </Link>
          <Divider />
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/balazsorban44"
            aria-label="Code — GitHub"
          >
            <span className="rune mr-1 text-ember" aria-hidden="true">
              ᚷ
            </span>
            Code
          </Link>
          <Divider />
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:info@balazsorban.com"
            aria-label="Email"
          >
            <span className="rune mr-1 text-ember" aria-hidden="true">
              ᛗ
            </span>
            Mail
          </Link>
        </div>
        <div className="ml-auto">
          <MusicToggle />
        </div>
      </footer>
    </>
  )
}
