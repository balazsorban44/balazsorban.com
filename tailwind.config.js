module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        ember: "rgb(var(--ember) / <alpha-value>)",
        moss: "rgb(var(--moss) / <alpha-value>)",
        bark: "rgb(var(--bark) / <alpha-value>)",
        rune: "rgb(var(--rune) / <alpha-value>)",
        main: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        rune: ['"Noto Sans Runic"', '"Segoe UI Historic"', "serif"],
        display: ['"Cinzel"', '"Trajan Pro"', "Georgia", "serif"],
        body: ['"EB Garamond"', '"Iowan Old Style"', "Georgia", "serif"],
      },
      boxShadow: {
        ring: "0 0 0 2px rgb(var(--bg)), 0 0 0 6px rgb(var(--accent) / 0.6)",
        ember: "0 0 24px rgb(var(--ember) / 0.45)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
