import { Divider } from "components/dividier"
import { Emoji } from "components/emoji"
import { Link } from "components/link"
import { ThemeToggle } from "components/theme-toggle"
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
        <meta name="theme-color" content="#0a0c0a" />
      </Head>

      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <MusicToggle />
        <ThemeToggle />
      </div>

      <main className="p-4 flex items-center flex-col flex-1">
        <Component {...pageProps} />
      </main>

      <footer className="relative z-10 mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mx-auto">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/balazsorban44"
        >
          Twitter <Emoji label="Bird">🐦</Emoji>
        </Link>
        <Divider />
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/balazsorban44"
        >
          GitHub <Emoji label="Man with computer">👨‍💻</Emoji>
        </Link>
        <Divider />
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:info@balazsorban.com"
        >
          Mail me <Emoji label="Mailbox">📫</Emoji>
        </Link>
      </footer>
    </>
  )
}
