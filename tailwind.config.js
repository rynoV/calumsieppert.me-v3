const defaultTheme = require('tailwindcss/defaultTheme')
const config = require('./my-config')

module.exports = {
  theme: {
    fontFamily: {
      sans: [...config.fonts, ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
