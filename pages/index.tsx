import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Emoji } from "components/emoji"
import { Link as StyledLink, linkClassName } from "components/link"
import { NowPlaying } from "components/now-playing"
import Container from "components/container"
import { Monogram } from "components/monogram"

// Animated background — only on the client.
const MistyScene = dynamic(
  () => import("components/misty-scene").then((m) => m.MistyScene),
  { ssr: false }
)

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"

export default function Home() {
  return (
    <Container skipHeader>
      <MistyScene />
      <div className="fade-in flex flex-1 flex-col justify-center max-w-5xl w-full mx-auto">
        <RuneStrip />

        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] items-center gap-10 md:gap-16">
          <Monogram />

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h1 className="text-4xl sm:text-5xl tracking-tight">
                <strong className="text-ink">Balázs</strong>{" "}
                <span className="text-ink/80">Orbán</span>
              </h1>
              <Link
                href="/blog"
                className={`${linkClassName} text-sm`}
              >
                Blog
              </Link>
            </div>

            <p className="rune text-rune/70 text-sm mb-4 tracking-[0.4em]">
              ᛒᚨᛚᚨᛉᛋ · ᛟᚱᛒᚨᚾ
            </p>

            <p className="text-ink/90 leading-relaxed sm:max-w-xl">
              {"Created "}
              <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://authjs.dev"
              >
                Auth.js
              </StyledLink>
              <Emoji label="locked padlock">🔒</Emoji>
              {". Tech Lead at "}
              <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.unite.as"
              >
                Unite AS
              </StyledLink>
              {". "}
              <a
                className="underline decoration-ember/60 underline-offset-4 hover:text-ember"
                href="https://twitter.com/balazsorban44/status/1432769186938380291"
              >
                Previously, Software Engineer at ▲Vercel, helped maintaining{" "}
                <span className="font-mono">Next.js</span> and was working with
                auth and security
              </a>
              {". A Hungarian "}
              <Emoji label="Hungarian flag">🇭🇺</Emoji>
              {" and Norwegian citizen living in Norway "}
              <Emoji label="Norwegian flag">🇳🇴</Emoji>
              {". Likes bouldering"} <Emoji label="climbing">🧗</Emoji>
              {", sauna"} <Emoji label="sauna">🧖</Emoji>
              {" and photography"} <Emoji label="camera with flash">📸</Emoji>.
              I am a work in progress.
            </p>

            <Lore />
          </div>
        </div>

        <div className="mt-10">
          <NowPlaying />
        </div>
      </div>
    </Container>
  )
}

function RuneStrip() {
  return (
    <div
      aria-hidden="true"
      className="rune mb-8 hidden select-none items-center gap-3 text-rune/40 sm:flex"
    >
      <span className="h-px flex-1 bg-rune/15" />
      <span className="text-sm tracking-[0.6em]">{RUNES.slice(0, 12)}</span>
      <span className="h-px flex-1 bg-rune/15" />
    </div>
  )
}

function Lore() {
  const items: { rune: string; label: string }[] = [
    { rune: "ᛗ", label: "mountains" },
    { rune: "ᛚ", label: "rain" },
    { rune: "ᛇ", label: "pine forest" },
    { rune: "ᚠ", label: "fire" },
  ]
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.25em] text-muted">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2">
          <span className="rune text-base text-ember">{i.rune}</span>
          <span>{i.label}</span>
        </li>
      ))}
    </ul>
  )
}
