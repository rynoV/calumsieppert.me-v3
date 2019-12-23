const defaultTheme = require('tailwindcss/defaultTheme')
const config = require('./my-config')

const primary = '#A2BF8A'

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
      borderColor: {
        primary,
      },
      color: {
        primary,
        pink: '#B58DAE',
      },
      textColor: {
        primary: '#E8EBEF',
        red: '#C16069',
        orange: '#D2876D',
        green: '#A2BF8A',
        teal: '#8EBCBB',
        yellow: '#ECCC87',
        blue: '#80A0C2',
        darkBlue: '#5C748E',
        magenta: '#B58DAE',
        violet: '#5D80AE',
        cyan: '#86C0D1',
        darkCyan: '#507681',
      },
      backgroundColor: {
        primary: '#434C5E',
      },
    },
  },
  variants: {
    textColor: ['visited', 'hover'],
    margin: ['responsive', 'first'],
  },
}
