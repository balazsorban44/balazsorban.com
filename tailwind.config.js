module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        main: "hsl(16.2, 100%, 50%)",
      },
    },
    boxShadow: {
      ring: "0 0 0 2px #000, 0 0 0 6px hsl(16.2, 100%, 30%)",
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
