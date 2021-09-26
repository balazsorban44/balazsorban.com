module.exports = {
  mode: "jit",
  purge: ["./**/*.{ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: "hsl(16.2, 100%, 50%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
