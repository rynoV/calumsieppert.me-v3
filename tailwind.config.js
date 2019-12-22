const defaultTheme = require('tailwindcss/defaultTheme')
const config = require('./my-config')

module.exports = {
  theme: {
    zIndex: {
      '-10': '-10',
      '-20': '-20',
    },
    fontFamily: {
      sans: [...config.fonts, ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
