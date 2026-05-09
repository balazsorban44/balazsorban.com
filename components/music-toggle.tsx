import { useEffect, useRef, useState } from "react"

/**
 * Procedural "Norse" drone — generated entirely in the browser via the
 * Web Audio API.  No audio assets shipped.  A handful of detuned sawtooth
 * voices are routed through a low-pass filter and a bit of reverb-like
 * delay to evoke a slow, misty horn / nyckelharpa pad.
 *
 * Browsers refuse to play audio before a user gesture, so the toggle is
 * "on" by default but actual sound waits for the first click anywhere
 * (a one-shot listener wires it up).
 */
const STORAGE_KEY = "bo-music"
type State = "on" | "off"

function readStored(): State {
  if (typeof window === "undefined") return "on"
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === "off" ? "off" : "on"
}

export function MusicToggle() {
  const [state, setState] = useState<State>("on")
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const startedRef = useRef(false)

  // Hydrate from storage
  useEffect(() => setState(readStored()), [])

  function ensureGraph() {
    if (ctxRef.current) return ctxRef.current
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return null
    const ctx = new Ctor()
    const master = ctx.createGain()
    master.gain.value = 0.0001
    master.connect(ctx.destination)

    // Low-pass to keep things warm / muffled like a horn through fog.
    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 700
    lp.Q.value = 0.4
    lp.connect(master)

    // Lush delay for a hall / cave tail.
    const dly = ctx.createDelay(2)
    dly.delayTime.value = 0.55
    const fb = ctx.createGain()
    fb.gain.value = 0.45
    dly.connect(fb)
    fb.connect(dly)
    dly.connect(lp)

    // Three slow, detuned voices — root + fifth + minor third (dorian-ish).
    const freqs = [73.42, 110.0, 87.31] // D2 + A2 + F2
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 0 ? "sawtooth" : "triangle"
      osc.frequency.value = f
      const lfo = ctx.createOscillator()
      lfo.type = "sine"
      lfo.frequency.value = 0.07 + i * 0.03
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 1.5 + i * 0.5
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)

      const g = ctx.createGain()
      g.gain.value = 0.18
      osc.connect(g)
      g.connect(lp)
      g.connect(dly)
      osc.start()
      lfo.start()
    })

    // Occasional gentle bell / wind chime.
    function tick() {
      if (!ctxRef.current) return
      const c = ctxRef.current
      const now = c.currentTime
      const osc = c.createOscillator()
      const g = c.createGain()
      const partials = [220, 330, 440, 587]
      const f = partials[Math.floor(Math.random() * partials.length)]
      osc.frequency.value = f
      osc.type = "sine"
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.06, now + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.6)
      osc.connect(g)
      g.connect(dly)
      osc.start(now)
      osc.stop(now + 2.7)
      setTimeout(tick, 4000 + Math.random() * 6000)
    }
    setTimeout(tick, 2500)

    ctxRef.current = ctx
    gainRef.current = master
    return ctx
  }

  function fadeTo(v: number, time = 1.2) {
    const ctx = ctxRef.current
    const g = gainRef.current
    if (!ctx || !g) return
    const now = ctx.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(Math.max(0.0001, v), now + time)
  }

  function startIfPossible() {
    if (startedRef.current) return
    if (state !== "on") return
    const ctx = ensureGraph()
    if (!ctx) return
    if (ctx.state === "suspended") ctx.resume().catch(() => {})
    startedRef.current = true
    fadeTo(0.18, 2.2)
  }

  // Wait for first user gesture (autoplay restrictions).
  useEffect(() => {
    if (state !== "on") return
    const handler = () => {
      startIfPossible()
      window.removeEventListener("pointerdown", handler)
      window.removeEventListener("keydown", handler)
    }
    window.addEventListener("pointerdown", handler, { once: true })
    window.addEventListener("keydown", handler, { once: true })
    return () => {
      window.removeEventListener("pointerdown", handler)
      window.removeEventListener("keydown", handler)
    }
  }, [state])

  function toggle() {
    setState((prev) => {
      const next: State = prev === "on" ? "off" : "on"
      window.localStorage.setItem(STORAGE_KEY, next)
      if (next === "on") {
        const ctx = ensureGraph()
        if (ctx?.state === "suspended") ctx.resume().catch(() => {})
        startedRef.current = true
        fadeTo(0.18, 1.6)
      } else {
        fadeTo(0.0001, 0.8)
      }
      return next
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        ctxRef.current?.close()
      } catch {}
    }
  }, [])

  const tip =
    state === "on"
      ? "Mute mistwood drone (ᚹ → ᚺ)"
      : "Play mistwood drone (ᚺ → ᚹ)"
  const rune = state === "on" ? "ᚹ" : "ᚺ"

  return (
    <button
      type="button"
      onClick={toggle}
      data-tooltip={tip}
      aria-label={tip}
      aria-pressed={state === "on"}
      className="rune relative grid h-10 w-10 place-items-center rounded-full border border-rune/30 bg-surface/40 text-lg text-rune backdrop-blur transition hover:border-ember hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
    >
      <span aria-hidden="true">{rune}</span>
      {state === "on" && (
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-ember/50 animate-pulse" />
      )}
    </button>
  )
}
