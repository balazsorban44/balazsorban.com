import { useEffect, useRef } from "react"

/**
 * A layered, animated Nordic landscape rendered to a single <canvas>.
 *
 *   ─── sky / aurora gradient (CSS-var driven, theme aware)
 *   ─── distant mountain ridges (3 layers, parallax)
 *   ─── pine forest silhouettes (2 layers)
 *   ─── drifting fog / mist
 *   ─── rain streaks
 *   ─── floating ember particles & runes rising from the trees
 *
 * Reads --bg, --moss, --bark, --ember, --rune, --ink so the scene re-tints
 * when the user toggles dark / light.
 */
export function MistyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    let width = 0
    let height = 0
    let raf = 0
    let start = performance.now()
    let lastTime = start

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    /* ---- mountain ridges (deterministic random) ---- */
    function ridge(seed: number, points: number, jaggedness: number) {
      const rng = mulberry32(seed)
      const arr: number[] = []
      for (let i = 0; i <= points; i++) {
        arr.push(rng() * jaggedness)
      }
      return arr
    }
    const ridges = [
      { data: ridge(11, 24, 1), top: 0.42, height: 0.18, alpha: 0.55 },
      { data: ridge(23, 28, 1), top: 0.5, height: 0.22, alpha: 0.7 },
      { data: ridge(47, 36, 1), top: 0.6, height: 0.28, alpha: 0.95 },
    ]

    /* ---- pine trees ---- */
    type Pine = { x: number; height: number; layer: number }
    let pines: Pine[] = []
    function buildPines() {
      pines = []
      const rng = mulberry32(91)
      const back = Math.floor(width / 22)
      for (let i = 0; i < back; i++) {
        pines.push({
          x: rng() * width,
          height: 30 + rng() * 50,
          layer: 0,
        })
      }
      const front = Math.floor(width / 14)
      for (let i = 0; i < front; i++) {
        pines.push({
          x: rng() * width,
          height: 60 + rng() * 110,
          layer: 1,
        })
      }
    }

    /* ---- particles: rain, embers, runes ---- */
    type Drop = { x: number; y: number; len: number; speed: number }
    type Ember = {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
    }
    type Rune = {
      x: number
      y: number
      vy: number
      life: number
      maxLife: number
      char: string
      size: number
    }
    let rain: Drop[] = []
    let embers: Ember[] = []
    let runes: Rune[] = []

    const RUNE_CHARS = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split("")

    function rebuildRain() {
      const target = Math.floor((width * height) / 26000)
      rain = []
      for (let i = 0; i < target; i++) rain.push(makeDrop())
    }
    function makeDrop(): Drop {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        len: 6 + Math.random() * 10,
        speed: 240 + Math.random() * 180, // px/sec
      }
    }
    function spawnEmber() {
      const baseY = height * 0.78
      embers.push({
        x: Math.random() * width,
        y: baseY + Math.random() * height * 0.12,
        vx: (Math.random() - 0.5) * 12,
        vy: -(20 + Math.random() * 30),
        life: 0,
        maxLife: 4 + Math.random() * 4,
        size: 1 + Math.random() * 1.8,
      })
    }
    function spawnRune() {
      runes.push({
        x: Math.random() * width,
        y: height * 0.85,
        vy: -(8 + Math.random() * 8),
        life: 0,
        maxLife: 9 + Math.random() * 5,
        char: RUNE_CHARS[
          Math.floor(Math.random() * RUNE_CHARS.length)
        ],
        size: 14 + Math.random() * 16,
      })
    }

    function readVar(name: string, fallback: string): string {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
      return v || fallback
    }
    function rgb(v: string, a: number) {
      return `rgba(${v.replace(/\s+/g, ",")},${a})`
    }

    function resize() {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      const rect = canvas.getBoundingClientRect()
      // Bail if nothing actually changed (mobile URL-bar transitions
      // fire resize events even though our css uses 100lvh/100vw).
      if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1) {
        return
      }
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildPines()
      rebuildRain()
    }

    function drawSky() {
      const bg = readVar("--bg", "8 12 10")
      const accent = readVar("--ember", "240 145 60")
      const moss = readVar("--moss", "56 92 70")

      const g = ctx.createLinearGradient(0, 0, 0, height)
      g.addColorStop(0, rgb(bg, 1))
      g.addColorStop(0.55, rgb(moss, 0.18))
      g.addColorStop(1, rgb(bg, 1))
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      // Aurora glow
      const radial = ctx.createRadialGradient(
        width * 0.7,
        height * 0.15,
        0,
        width * 0.7,
        height * 0.15,
        Math.max(width, height) * 0.6
      )
      radial.addColorStop(0, rgb(accent, 0.18))
      radial.addColorStop(0.4, rgb(accent, 0.06))
      radial.addColorStop(1, rgb(accent, 0))
      ctx.fillStyle = radial
      ctx.fillRect(0, 0, width, height)
    }

    function drawMountains(time: number) {
      const moss = readVar("--moss", "56 92 70")
      const bark = readVar("--bark", "84 58 36")
      const bg = readVar("--bg", "8 12 10")

      ridges.forEach((r, i) => {
        ctx.beginPath()
        const baseY = height * r.top
        const span = height * r.height
        const drift = Math.sin(time * 0.00005 + i) * 8
        const segs = r.data.length - 1
        ctx.moveTo(0, height)
        for (let s = 0; s <= segs; s++) {
          const x = (s / segs) * width
          const y = baseY + r.data[s] * span - drift
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        const tint = i === 2 ? bg : i === 1 ? bark : moss
        const g = ctx.createLinearGradient(0, baseY, 0, height)
        g.addColorStop(0, rgb(tint, r.alpha * 0.85))
        g.addColorStop(1, rgb(bg, 1))
        ctx.fillStyle = g
        ctx.fill()
      })
    }

    function drawPines() {
      const bg = readVar("--bg", "8 12 10")
      const moss = readVar("--moss", "56 92 70")

      pines.forEach((p) => {
        const baseY =
          height * (p.layer === 0 ? 0.78 : 0.92) - (p.layer === 0 ? 0 : 6)
        const top = baseY - p.height
        const halfW = p.height * 0.18
        ctx.beginPath()
        ctx.moveTo(p.x, top)
        ctx.lineTo(p.x + halfW, baseY)
        ctx.lineTo(p.x - halfW, baseY)
        ctx.closePath()
        ctx.fillStyle = rgb(p.layer === 0 ? moss : bg, p.layer === 0 ? 0.7 : 1)
        ctx.fill()
      })
    }

    function drawFog(time: number) {
      const ink = readVar("--ink", "232 224 206")
      for (let i = 0; i < 3; i++) {
        const y = height * (0.45 + i * 0.13)
        const phase = time * 0.00004 + i * 1.7
        const cx = (Math.sin(phase) * 0.5 + 0.5) * width
        const r = width * (0.35 + 0.1 * i)
        const g = ctx.createRadialGradient(cx, y, 0, cx, y, r)
        g.addColorStop(0, rgb(ink, 0.07))
        g.addColorStop(1, rgb(ink, 0))
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height)
      }
    }

    function drawRain(dt: number) {
      const ink = readVar("--ink", "232 224 206")
      ctx.strokeStyle = rgb(ink, 0.18)
      ctx.lineWidth = 1
      ctx.beginPath()
      const angle = -0.12
      for (const d of rain) {
        d.y += d.speed * dt
        d.x += d.speed * dt * angle
        if (d.y > height || d.x > width + 10) {
          d.y = -10
          d.x = Math.random() * width
        }
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.len * angle, d.y + d.len)
      }
      ctx.stroke()
    }

    function drawEmbers(dt: number) {
      const ember = readVar("--ember", "240 145 60")
      // spawn rate
      if (Math.random() < dt * 6) spawnEmber()
      embers = embers.filter((e) => e.life < e.maxLife)
      for (const e of embers) {
        e.life += dt
        e.x += e.vx * dt
        e.y += e.vy * dt
        e.vy -= dt * 4 // buoyancy
        const t = e.life / e.maxLife
        const a = Math.max(0, 1 - t) * 0.85
        ctx.fillStyle = rgb(ember, a)
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawRunes(dt: number) {
      const rune = readVar("--rune", "220 190 140")
      if (Math.random() < dt * 0.7) spawnRune()
      runes = runes.filter((r) => r.life < r.maxLife)
      for (const r of runes) {
        r.life += dt
        r.y += r.vy * dt
        const t = r.life / r.maxLife
        const a = Math.sin(Math.PI * t) * 0.55
        ctx.fillStyle = rgb(rune, a)
        ctx.font = `${r.size}px "Noto Sans Runic", "Segoe UI Historic", serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(r.char, r.x, r.y)
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now
      const t = now - start

      drawSky()
      drawMountains(t)
      drawFog(t)
      drawPines()
      drawRain(reduced ? 0 : dt)
      drawEmbers(reduced ? 0 : dt)
      drawRunes(reduced ? 0 : dt)

      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(frame)

    // Re-render on visibility / theme change
    const obs = new MutationObserver(() => {
      // forces fresh draws with the new CSS vars on the next frame
      lastTime = performance.now()
    })
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      obs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="misty-canvas"
    />
  )
}

/* small deterministic PRNG */
function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
