import Image from "next/image"

/**
 * The "OB" monogram:
 *
 *   ─── B = the Vercel triangle (a wink at having worked there)
 *   ─── O = the circular profile photo (sitting in the wider lower
 *           half of the triangle, with its apex jutting up like a hat)
 */
export function Monogram() {
  const frame = 280
  const photo = 130
  return (
    <div
      className="group relative shrink-0 select-none"
      style={{ width: frame, height: frame }}
    >
      {/* Vercel triangle = B */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          width={frame * 0.92}
          height={frame * 0.92}
          viewBox="0 0 280 280"
          className="opacity-95 transition-opacity duration-500 group-hover:opacity-100"
        >
          <defs>
            <linearGradient id="ob-tri" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(var(--ember))"
                stopOpacity="0.95"
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.95"
              />
            </linearGradient>
            <filter id="ob-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <polygon
            points="40,220 240,220 140,46"
            fill="url(#ob-tri)"
            filter="url(#ob-glow)"
            opacity="0.7"
          />
          <polygon
            points="40,220 240,220 140,46"
            fill="none"
            stroke="rgb(var(--ember))"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Profile photo = O — sits inside the wider lower half of the triangle. */}
      <span
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "drop-shadow(0 4px 24px rgb(0 0 0 / 0.55))" }}
      >
        <Image
          className="rounded-full ring-2 ring-rune/50 transition duration-500 hover:scale-95 hover:ring-ember"
          src="/images/me.jpg"
          width={photo}
          height={photo}
          alt="Balázs Orbán"
          priority
        />
      </span>
    </div>
  )
}
