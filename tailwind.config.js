const colors = require("tailwindcss/colors")

module.exports = {
  content: [
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
        lightBlue: colors.sky,
        cyan: colors.cyan
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
