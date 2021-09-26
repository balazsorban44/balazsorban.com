import { Divider } from "components/dividier"
import { Emoji } from "components/emoji"
import { Link } from "components/link"
import "../global.css"
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
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <main className="p-4 flex items-center flex-col">
        <Component {...pageProps} />
      </main>
      <footer className="flex items-center flex-wrap space-x-4 justify-center sm:mx-auto">
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
