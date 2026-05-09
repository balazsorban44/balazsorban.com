import Image from "next/image"

/**
 * The "OB" monogram:
 *   O = the circular profile photo
 *   B = the Vercel triangle (a wink at having worked there)
 *
 * Kept and refined — same two primitives, now with a glowing
 * ember halo and a runic ring drifting around the photo.
 */
export function Monogram() {
  return (
    <div className="relative shrink-0 select-none transform scale-90 sm:scale-100">
      <div className="hero-rune-ring relative h-[280px] w-[280px]">
        {/* Vercel triangle = B */}
        <span
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            className="opacity-70 transition-opacity duration-500 group-hover:opacity-100"
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
                  stopOpacity="0.85"
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
              opacity="0.55"
            />
            <polygon
              points="40,220 240,220 140,46"
              fill="none"
              stroke="rgb(var(--ember))"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Profile photo = O */}
        <span
          className="group absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 4px 24px rgb(0 0 0 / 0.45))" }}
        >
          <Image
            className="rounded-full ring-2 ring-rune/40 transition duration-500 hover:scale-95 hover:ring-ember"
            src="/images/me.jpg"
            width={150}
            height={150}
            alt="Balázs Orbán"
            priority
          />
        </span>

        {/* small rune at apex */}
        <span
          className="rune absolute left-1/2 top-2 -translate-x-1/2 text-rune/70"
          style={{ fontSize: 18 }}
          aria-hidden="true"
        >
          ᛟ
        </span>
      </div>
    </div>
  )
}
