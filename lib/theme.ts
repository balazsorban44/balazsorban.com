import { useEffect, useState, useCallback } from "react"

export type ThemeMode = "system" | "dark" | "light"

const STORAGE_KEY = "bo-theme"

export function resolveSystem(): "dark" | "light" {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark"
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return
  const resolved = mode === "system" ? resolveSystem() : mode
  document.documentElement.dataset.theme = resolved
  document.documentElement.dataset.themeMode = mode
}

export function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const v = window.localStorage.getItem(STORAGE_KEY)
  if (v === "dark" || v === "light" || v === "system") return v
  return "system"
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("system")

  useEffect(() => {
    const m = readStoredMode()
    setMode(m)
    applyTheme(m)
  }, [])

  useEffect(() => {
    if (mode !== "system") return
    const mql = window.matchMedia("(prefers-color-scheme: light)")
    const handler = () => applyTheme("system")
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [mode])

  const cycle = useCallback(() => {
    setMode((prev) => {
      const next: ThemeMode =
        prev === "system" ? "dark" : prev === "dark" ? "light" : "system"
      window.localStorage.setItem(STORAGE_KEY, next)
      applyTheme(next)
      return next
    })
  }, [])

  return { mode, cycle }
}

/* Inlined into <head> to avoid a flash of incorrect theme on first paint. */
export const themeBootScript = `
(function(){try{
  var k='${STORAGE_KEY}';
  var m=localStorage.getItem(k);
  if(m!=='dark'&&m!=='light'&&m!=='system') m='system';
  var r=m==='system'
    ? (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')
    : m;
  document.documentElement.dataset.theme=r;
  document.documentElement.dataset.themeMode=m;
}catch(e){document.documentElement.dataset.theme='dark';}})();
`
