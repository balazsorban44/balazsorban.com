import { Divider } from "components/dividier"
import { Link } from "components/link"
import { MusicToggle } from "components/music-toggle"
import "styles/global.css"
import Head from "next/head"
import { useRouter } from "next/router"
import { useAnalytics } from "lib/analytics"

const meta = {
  title: "Balázs Orbán",
  description: `JavaScript open sourcerer • hobby photographer.`,
  type: "website",
}

export default function App({ Component, pageProps }) {
  useAnalytics()

  const router = useRouter()
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

      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <MusicToggle />
      </div>

      <main className="px-4 pt-4 pb-2 flex items-stretch justify-center flex-col flex-1 min-h-0">
        <Component {...pageProps} />
      </main>

      <footer className="relative z-10 mb-4 mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:mx-auto">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/balazsorban44"
          aria-label="Twitter / X"
        >
          <span className="rune mr-1 text-ember" aria-hidden="true">
            ᚱ
          </span>
          Twitter
        </Link>
        <Divider />
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/balazsorban44"
          aria-label="GitHub"
        >
          <span className="rune mr-1 text-ember" aria-hidden="true">
            ᚷ
          </span>
          GitHub
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
      </footer>
    </>
  )
}
