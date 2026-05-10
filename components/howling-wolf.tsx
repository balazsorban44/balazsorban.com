/**
 * A stylised howling-wolf silhouette: sitting on its haunches, head
 * tilted up, snout open.  Drawn from simple shapes so it scales
 * cleanly and stays inky black at any size.
 */
export function HowlingWolf({
  size = 120,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 220 200"
      width={size}
      height={size * (200 / 220)}
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      {/* bushy tail curving up behind the body */}
      <path d="M 38 130 Q 4 96 14 56 Q 30 78 42 110 Q 50 124 38 130 Z" />

      {/* main body — a sitting torso */}
      <path
        d="M 30 168
           C 20 168 18 150 24 132
           C 30 110 50 100 78 100
           C 110 100 142 116 142 140
           L 142 192
           L 122 192
           L 122 168
           C 116 168 110 168 104 170
           L 104 192
           L 84 192
           L 84 174
           C 70 178 56 178 44 174
           Z"
      />

      {/* front leg, planted forward */}
      <path d="M 134 138 L 142 138 L 146 192 L 130 192 Z" />

      {/* neck rising up to the lifted head */}
      <path
        d="M 118 116
           C 132 90 148 74 162 64
           L 178 78
           C 168 96 154 116 138 132
           Z"
      />

      {/* head: muzzle pointing up-and-back to the sky */}
      <path
        d="M 158 66
           L 192 14
           L 204 22
           L 196 36
           L 188 36
           L 184 50
           L 174 64
           L 166 80
           Z"
      />

      {/* lower jaw, opened slightly for the howl */}
      <path d="M 174 68 L 198 30 L 208 36 L 184 76 Z" />

      {/* upright pointed ear */}
      <path d="M 156 70 L 150 44 L 170 60 Z" />

      {/* the howl: a small breath/sound puff above the muzzle */}
      <circle cx="200" cy="6" r="2" opacity="0.55" />
      <circle cx="207" cy="2" r="1.4" opacity="0.4" />
    </svg>
  )
}
