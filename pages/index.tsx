import * as React from "react"
import Image from "next/image"
import { Emoji } from "components/emoji"
import { Link } from "components/link"
import { NowPlaying } from "components/now-playing"

const start = new Date("2021-11-29")

export default function Home() {
  const [tick, tock] = React.useState(new Date())
  React.useEffect(() => {
    const interval = setInterval(() => {
      tock(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const hasStarted = tick > start

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl mb-2">
        <strong>Balázs</strong> Orbán
      </h1>
      <p className="opacity-90 sm:max-w-md">
        {hasStarted ? null : <Countdown time={tick} />}
        <a href="https://twitter.com/balazsorban44/status/1432769186938380291">
          <span className={hasStarted ? undefined : "line-through"}>
            Software Engineer at ▲Vercel, working on{" "}
            <span className="font-mono">Next.js</span>.
          </span>
        </a>
        {" Maintains"}&nbsp;
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://next-auth.js.org"
        >
          NextAuth.js
        </Link>
        <Emoji label="locked padlock">🔒</Emoji>
        {". A Hungarian "}
        <Emoji label="Hungarian flag">🇭🇺</Emoji>
        {" living in Norway "}
        <Emoji label="Norwegian flag">🇳🇴</Emoji>
        {". Likes bouldering"} <Emoji label="climbing">🧗</Emoji>
        {", riding my e-bike"} <Emoji label="bicycling">🚴</Emoji>
        {"and photography"} <Emoji label="camera with flash">📸</Emoji>. But
        mostly enjoys coding <Emoji label="smiley with glasses">🤓</Emoji>.
      </p>
      <Me />
      <NowPlaying />
    </div>
  )
}

function Me() {
  return (
    <div className="relative transform  scale-75 sm:m-16 sm:transform-none">
      <div
        className="opacity-50 transition-opacity duration-200 hover:opacity-95"
        style={{
          borderColor:
            "transparent transparent transparent hsl(16.2, 100%, 50%)",
          borderWidth: "120px 0 120px 207.8px",
        }}
      />
      <span className="absolute" style={{ top: 0, left: 60 }}>
        <Image
          className="rounded-full filter grayscale contrast-150 brightness-75 transition duration-200 hover:grayscale-0 hover:transform hover:scale-95 hover:opacity-100 hover:contrast-100 hover:brightness-100"
          src="/me.jpg"
          width="240"
          height="240"
          alt="A headshot of me"
        />
      </span>
    </div>
  )
}

function Countdown(props: { time: Date }) {
  const { time } = props

  const days = Math.round(start.valueOf() - time.valueOf()) / 1000
  return (
    <span className="font-mono block text-sm">{`${days.toLocaleString(
      undefined,
      {
        maximumFractionDigits: 0,
      }
    )} seconds until: `}</span>
  )
}
