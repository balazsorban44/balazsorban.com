import { Html, Head, Main, NextScript } from "next/document"

export default function Document {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico?v=2" rel="shortcut icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
