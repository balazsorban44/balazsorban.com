import { useEffect, useRef, useState } from "react"

/**
 * "Mistwood" — an original procedural Norse-flavoured piece, generated
 * entirely in the browser via the Web Audio API.  No external assets,
 * fully embeddable, runs even when offline.
 *
 *   • a slow, detuned drone in D dorian (D + A + F)
 *   • a sparse melodic horn line over a D-minor pentatonic scale
 *   • a soft frame-drum heartbeat on the down-beat
 *   • a low-pass filter + long delay tail for a cave-like reverb feel
 *
 * Browsers refuse to start audio before a user gesture, so the toggle is
 * "on" by default but actual sound waits for the first interaction.
 */
const STORAGE_KEY = "bo-music"
type State = "on" | "off"

function readStored(): State {
  if (typeof window === "undefined") return "on"
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === "off" ? "off" : "on"
}

// D-minor pentatonic melody fragments (Hz). Each row is one phrase.
const MELODIES: number[][] = [
  [293.66, 349.23, 392.0, 349.23, 293.66, 261.63], // D F G F D C
  [349.23, 392.0, 440.0, 392.0, 349.23], // F G A G F
  [261.63, 293.66, 349.23, 293.66, 261.63, 220.0], // C D F D C A
  [392.0, 440.0, 523.25, 440.0, 392.0, 349.23], // G A C5 A G F
]

export function MusicToggle() {
  const [state, setState] = useState<State>("on")
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const stoppersRef = useRef<Array<() => void>>([])
  const startedRef = useRef(false)

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

    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 1100
    lp.Q.value = 0.5
    lp.connect(master)

    const dly = ctx.createDelay(2)
    dly.delayTime.value = 0.6
    const fb = ctx.createGain()
    fb.gain.value = 0.42
    dly.connect(fb)
    fb.connect(dly)
    dly.connect(lp)

    /* ---- Drone: three detuned voices ---- */
    const droneGain = ctx.createGain()
    droneGain.gain.value = 0.16
    droneGain.connect(lp)
    droneGain.connect(dly)

    const droneFreqs = [73.42, 110.0, 87.31] // D2, A2, F2
    droneFreqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 0 ? "sawtooth" : "triangle"
      osc.frequency.value = f
      const lfo = ctx.createOscillator()
      lfo.type = "sine"
      lfo.frequency.value = 0.06 + i * 0.04
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 1.5 + i * 0.4
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      const g = ctx.createGain()
      g.gain.value = 0.36
      osc.connect(g)
      g.connect(droneGain)
      osc.start()
      lfo.start()
      stoppersRef.current.push(() => {
        try {
          osc.stop()
        } catch {}
        try {
          lfo.stop()
        } catch {}
      })
    })

    /* ---- Horn: sparse melodic line ---- */
    function playNote(freq: number, when: number, dur: number) {
      const c = ctxRef.current
      if (!c) return
      const osc = c.createOscillator()
      // Stack a fundamental sine + a soft saw a fifth above for horn-ish color
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq * 0.997, when)
      osc.frequency.linearRampToValueAtTime(freq, when + 0.12)
      const osc2 = c.createOscillator()
      osc2.type = "sawtooth"
      osc2.frequency.value = freq * 1.5
      const g = c.createGain()
      g.gain.setValueAtTime(0, when)
      g.gain.linearRampToValueAtTime(0.12, when + 0.18)
      g.gain.linearRampToValueAtTime(0.08, when + dur * 0.7)
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur)
      const g2 = c.createGain()
      g2.gain.value = 0.04
      osc.connect(g)
      osc2.connect(g2)
      g.connect(lp)
      g2.connect(lp)
      g.connect(dly)
      osc.start(when)
      osc2.start(when)
      osc.stop(when + dur + 0.05)
      osc2.stop(when + dur + 0.05)
    }

    function scheduleMelody(startAt: number) {
      const c = ctxRef.current
      if (!c) return startAt
      const phrase = MELODIES[Math.floor(Math.random() * MELODIES.length)]
      let t = startAt
      for (const f of phrase) {
        const dur = 0.7 + Math.random() * 0.4
        // 35% chance to skip a note for breathing room
        if (Math.random() > 0.35) playNote(f, t, dur)
        t += dur + 0.05
      }
      return t + 1.5 + Math.random() * 1.5 // rest before next phrase
    }

    /* ---- Frame drum: soft heartbeat ---- */
    function playDrum(when: number, gainVal = 0.16) {
      const c = ctxRef.current
      if (!c) return
      const buffer = c.createBuffer(
        1,
        Math.floor(0.3 * c.sampleRate),
        c.sampleRate
      )
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        const t = i / c.sampleRate
        const env = Math.exp(-t * 14)
        data[i] = (Math.random() * 2 - 1) * env * 0.6
      }
      const src = c.createBufferSource()
      src.buffer = buffer
      const bp = c.createBiquadFilter()
      bp.type = "bandpass"
      bp.frequency.value = 90
      bp.Q.value = 4.5
      const g = c.createGain()
      g.gain.value = gainVal
      src.connect(bp)
      bp.connect(g)
      g.connect(lp)
      g.connect(dly)
      src.start(when)
    }

    function tickDrum() {
      const c = ctxRef.current
      if (!c) return
      const beat = 1.4 // seconds
      const next = c.currentTime + 0.05
      playDrum(next, 0.18)
      // an off-beat ghost hit
      playDrum(next + beat * 0.5, 0.06)
      setTimeout(tickDrum, beat * 1000)
    }

    function tickMelody() {
      const c = ctxRef.current
      if (!c) return
      const next = c.currentTime + 0.1
      const ended = scheduleMelody(next)
      const wait = Math.max(2000, (ended - c.currentTime) * 1000)
      setTimeout(tickMelody, wait)
    }

    setTimeout(tickDrum, 600)
    setTimeout(tickMelody, 1800)

    ctxRef.current = ctx
    masterRef.current = master
    return ctx
  }

  function fadeTo(v: number, time = 1.2) {
    const ctx = ctxRef.current
    const g = masterRef.current
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
    fadeTo(0.22, 2.4)
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
        fadeTo(0.22, 1.4)
      } else {
        fadeTo(0.0001, 0.7)
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
      ? "Mute Mistwood — original Norse drone (CC-BY)"
      : "Play Mistwood — original Norse drone (CC-BY)"
  const rune = state === "on" ? "ᚹ" : "ᚺ"

  return (
    <button
      type="button"
      onClick={toggle}
      data-tooltip={tip}
      data-tooltip-place="end"
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
