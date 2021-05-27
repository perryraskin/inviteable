const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  darkMode: "media",
  purge: [
    "./pages/**/*.tsx",
    "./pages/**/*.jsx",
    "./components/**/*.tsx",
    "./components/**/*.jsx",
    "./public/index.html",
    "./styles/tailwind.css"
  ],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        teal: colors.teal,
        amber: colors.amber,
        lightBlue: colors.lightBlue,
        cyan: colors.cyan
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    textColor: ["responsive", "hover", "focus", "active"],
    spinner: ["responsive"],
    transitionProperty: ["responsive"],
    animation: ["responsive", "motion-safe", "motion-reduce"]
  },
  plugins: [require("@tailwindcss/forms")]
}
