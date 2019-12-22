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
    extend: {
      textColor: {
        primary: '#E8EBEF',
        // secondary: "var(--color-text-secondary)",
        // default: "var(--color-text-default)",
        // "default-soft": "var(--color-text-default-soft)",
        // inverse: "var(--color-text-inverse)",
        // "inverse-soft": "var(--color-text-inverse-soft)"
      },
      backgroundColor: {
        primary: '#434C5E',
        // secondary: "var(--color-bg-secondary)",
        // default: "var(--color-bg-default)",
        // inverse: "var(--color-bg-inverse)"
      },
    },
  },
  variants: {},
  plugins: [],
}
