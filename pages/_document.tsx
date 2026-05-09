import { Html, Head, Main, NextScript } from "next/document"
import { themeBootScript } from "lib/theme"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico?v=2" rel="shortcut icon" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Runic&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
