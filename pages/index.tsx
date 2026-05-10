import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Link as StyledLink, linkClassName } from "components/link"
import Container from "components/container"
import { Monogram } from "components/monogram"

// Animated background — only on the client.
const MistyScene = dynamic(
  () => import("components/misty-scene").then((m) => m.MistyScene),
  { ssr: false }
)

/**
 * Runic glyphs used in place of emoji.  Each one has an aria-label so
 * screen readers still get the meaning.
 */
function R({ char, label }: { char: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="rune mx-1 text-ember align-baseline"
    >
      {char}
    </span>
  )
}

export default function Home() {
  return (
    <Container skipHeader>
      <MistyScene />
      <div className="fade-in mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 text-center">
        <Monogram />

        <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
          <h1 className="font-display text-3xl sm:text-4xl">
            <strong className="text-ink">Balázs</strong>{" "}
            <span className="text-ink/80">Orbán</span>
          </h1>
          <Link href="/blog" className={`${linkClassName} text-sm`}>
            Blog
          </Link>
        </div>

        <p className="rune text-rune/60 text-xs tracking-[0.45em]">
          ᛒᚨᛚᚨᛉᛋ · ᛟᚱᛒᚨᚾ
        </p>

        <p className="font-body text-base sm:text-lg leading-relaxed text-ink/90">
          Created{" "}
          <StyledLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://authjs.dev"
          >
            Auth.js
          </StyledLink>
          <R char="ᛟ" label="protection / inheritance" />. Tech Lead at{" "}
          <StyledLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.unite.as"
          >
            Unite AS
          </StyledLink>
          .{" "}
          <a
            className="underline decoration-ember/60 underline-offset-4 hover:text-ember"
            href="https://twitter.com/balazsorban44/status/1432769186938380291"
          >
            Previously, Software Engineer at ▲Vercel, helped maintain{" "}
            <span className="font-mono">Next.js</span>, working on auth and
            security
          </a>
          . A Hungarian and Norwegian citizen living in Norway. Likes
          bouldering
          <R char="ᛇ" label="climbing — yew rune" />, sauna
          <R char="ᚲ" label="sauna — torch / heat rune" /> and photography
          <R char="ᛜ" label="photography — frame rune" />. I am a work in
          progress.
        </p>
      </div>
    </Container>
  )
}
