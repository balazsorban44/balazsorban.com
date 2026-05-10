/**
 * A stylised Vegvísir — the Icelandic "wayfinder" stave.  Eight arms
 * radiate from a center point, each ending in a different ornament.
 * Drawn with `currentColor` so it picks up whatever colour wraps it,
 * and slowly rotates as a backdrop.
 */
export function Vegvisir({
  size = 320,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      {/* outer ring */}
      <circle r="96" opacity="0.6" />
      <circle r="86" opacity="0.25" strokeDasharray="2 4" />
      {/* inner hub */}
      <circle r="6" fill="currentColor" stroke="none" />
      <circle r="14" opacity="0.5" />

      {/* eight staves, each rotated to its angle */}
      {STAVES.map((g, i) => (
        <g key={i} transform={`rotate(${i * 45})`} opacity="0.95">
          {/* shaft */}
          <line x1="0" y1="-14" x2="0" y2="-86" />
          {/* per-stave end ornament */}
          {g}
        </g>
      ))}
    </svg>
  )
}

/* End-of-stave ornaments: one per arm.  All drawn pointing UP from origin
   (i.e. toward y=-90) and then rotated by the parent <g>. */
const STAVES = [
  // 0° – three crossbars
  <g key="a">
    <line x1="-9" y1="-86" x2="9" y2="-86" />
    <line x1="-7" y1="-90" x2="7" y2="-90" />
    <line x1="-5" y1="-94" x2="5" y2="-94" />
  </g>,
  // 45° – Y-fork
  <g key="b">
    <line x1="0" y1="-86" x2="-8" y2="-94" />
    <line x1="0" y1="-86" x2="8" y2="-94" />
  </g>,
  // 90° – diamond at tip
  <g key="c">
    <line x1="-7" y1="-86" x2="7" y2="-86" />
    <polygon points="0,-95 6,-89 0,-83 -6,-89" />
  </g>,
  // 135° – cross-bar with two end dots
  <g key="d">
    <line x1="-9" y1="-86" x2="9" y2="-86" />
    <circle cx="-9" cy="-92" r="2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="-92" r="2" fill="currentColor" stroke="none" />
  </g>,
  // 180° – arrow / spear
  <g key="e">
    <line x1="-7" y1="-86" x2="0" y2="-96" />
    <line x1="7" y1="-86" x2="0" y2="-96" />
  </g>,
  // 225° – three dots above bar
  <g key="f">
    <line x1="-9" y1="-86" x2="9" y2="-86" />
    <circle cx="0" cy="-92" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="-5" cy="-94" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="-94" r="1.5" fill="currentColor" stroke="none" />
  </g>,
  // 270° – T-bar with second cross
  <g key="g">
    <line x1="-9" y1="-86" x2="9" y2="-86" />
    <line x1="-5" y1="-92" x2="5" y2="-92" />
    <line x1="0" y1="-86" x2="0" y2="-96" />
  </g>,
  // 315° – open ring at tip
  <g key="h">
    <line x1="-7" y1="-86" x2="7" y2="-86" />
    <circle cx="0" cy="-93" r="5" />
  </g>,
]
