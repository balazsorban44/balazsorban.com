import { useTheme, type ThemeMode } from "lib/theme"

const LABELS: Record<ThemeMode, { rune: string; tip: string }> = {
  system: { rune: "ᛁ", tip: "Theme: follow system" },
  dark: { rune: "ᛗ", tip: "Theme: dark (forest at night)" },
  light: { rune: "ᛋ", tip: "Theme: light (mist at dawn)" },
}

export function ThemeToggle() {
  const { mode, cycle } = useTheme()
  const cur = LABELS[mode]
  return (
    <button
      type="button"
      onClick={cycle}
      data-tooltip={cur.tip}
      data-tooltip-place="end"
      aria-label={cur.tip}
      className="rune relative grid h-10 w-10 place-items-center rounded-full border border-rune/30 bg-surface/40 text-lg text-rune backdrop-blur transition hover:border-ember hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
    >
      <span aria-hidden="true">{cur.rune}</span>
    </button>
  )
}
