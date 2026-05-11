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
    type Bolt = {
      t: number
      duration: number
      main: Array<[number, number]>
      branches: Array<Array<[number, number]>>
    }
    let rain: Drop[] = []
    let embers: Ember[] = []
    let runes: Rune[] = []
    let bolts: Bolt[] = []

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
    function spawnBolt(toX: number, toY: number) {
      // Generate a jagged bolt from somewhere off the top of the viewport
      // down to (toX, toY), plus a couple of forking branches.
      const startX = toX + (Math.random() - 0.5) * width * 0.35
      const startY = -10
      const main: Array<[number, number]> = [[startX, startY]]
      const steps = 12 + Math.floor(Math.random() * 8)
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        const tx = startX + (toX - startX) * t
        const ty = startY + (toY - startY) * t
        const jitterX = (Math.random() - 0.5) * Math.max(20, width * 0.04)
        const jitterY = (Math.random() - 0.5) * 14
        main.push([tx + jitterX, ty + jitterY])
      }
      // Always end on the click point exactly.
      main[main.length - 1] = [toX, toY]

      const branches: Array<Array<[number, number]>> = []
      const branchCount = 1 + Math.floor(Math.random() * 3)
      for (let b = 0; b < branchCount; b++) {
        const idx = 3 + Math.floor(Math.random() * (main.length - 5))
        const [bx, by] = main[idx]
        const seg: Array<[number, number]> = [[bx, by]]
        const dirX = (Math.random() - 0.5) * 1.4
        const dirY = 0.4 + Math.random() * 0.7
        const segs = 4 + Math.floor(Math.random() * 4)
        const len = 70 + Math.random() * 110
        let cx = bx,
          cy = by
        for (let s = 1; s <= segs; s++) {
          cx += (dirX * len) / segs + (Math.random() - 0.5) * 18
          cy += (dirY * len) / segs + (Math.random() - 0.5) * 18
          seg.push([cx, cy])
        }
        branches.push(seg)
      }

      bolts.push({
        t: performance.now(),
        duration: 0.55,
        main,
        branches,
      })
      // Cap to a few simultaneous bolts to keep things sane.
      if (bolts.length > 4) bolts.shift()
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

    function drawBolts(now: number) {
      if (bolts.length === 0) return
      const ember = readVar("--ember", "240 145 60")

      // Drop expired
      bolts = bolts.filter((b) => (now - b.t) / 1000 < b.duration + 0.05)

      for (const b of bolts) {
        const elapsed = (now - b.t) / 1000
        const u = Math.min(1, elapsed / b.duration)

        // ── full-screen flash: gentler attack/decay so we don't get a
        // sharp flare-up.  Eased curve peaks at ~30% of the bolt's
        // lifetime then fades smoothly.
        const flashCurve =
          u < 0.18
            ? u / 0.18 // ramp up over ~100 ms
            : Math.max(0, 1 - (u - 0.18) / 0.6) // gentle ~330 ms tail
        const flashA = flashCurve * 0.42
        if (flashA > 0) {
          ctx.fillStyle = `rgba(255, 240, 215, ${flashA})`
          ctx.fillRect(0, 0, width, height)
        }

        // ── bolt itself: slower decay
        const boltA = Math.max(0, 1 - u * 1.4)
        if (boltA <= 0) continue

        // outer glow stroke
        ctx.save()
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = `rgba(${ember
          .replace(/\s+/g, ",")},${boltA * 0.55})`
        ctx.lineWidth = 7
        ctx.shadowColor = `rgba(${ember.replace(/\s+/g, ",")},${boltA})`
        ctx.shadowBlur = 18
        strokePolyline(ctx, b.main)
        for (const seg of b.branches) strokePolyline(ctx, seg)

        // inner bright core
        ctx.shadowBlur = 8
        ctx.strokeStyle = `rgba(255, 245, 220, ${boltA})`
        ctx.lineWidth = 2.2
        strokePolyline(ctx, b.main)
        for (const seg of b.branches) {
          ctx.lineWidth = 1.4
          strokePolyline(ctx, seg)
        }
        ctx.restore()
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
      drawBolts(now)

      raf = requestAnimationFrame(frame)
    }

    function onPointerDown(e: PointerEvent) {
      if (reduced) return
      // Ignore clicks we synthesized (e.g. ones that were dispatched by
      // a previous bolt itself — defensive belt-and-braces).
      spawnBolt(e.clientX, e.clientY)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
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
      window.removeEventListener("pointerdown", onPointerDown)
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

function strokePolyline(
  ctx: CanvasRenderingContext2D,
  pts: Array<[number, number]>
) {
  if (pts.length < 2) return
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.stroke()
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
