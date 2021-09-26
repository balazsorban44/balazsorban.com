import { Divider } from "components/dividier"
import { Emoji } from "components/emoji"
import { Link } from "components/link"
import "../global.css"

export default function App({ Component, pageProps }) {
  return (
    <>
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
