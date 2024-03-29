const defaultTheme = require('tailwindcss/defaultTheme')
const { config } = require('./my-config')

const primary = config.primaryColour

const navHeight = '60px'
const contentHeight = 'calc(var(--vh, 1vh) * 100)'
const bodyHeight = `calc(${contentHeight} - ${navHeight})`

module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
    ],
    theme: {
        fontFamily: {
            sans: [...config.fonts, ...defaultTheme.fontFamily.sans],
        },
        extend: {
            zIndex: {
                '-10': '-10',
                '-20': '-20',
            },
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
                primary: config.bgColour,
            },
            height: {
                nav: navHeight,
                body: bodyHeight,
                content: contentHeight,
            },
            maxWidth: {
                screen: '100vw',
            },
            maxHeight: {
                screen: '100vh',
            },
            minHeight: {
                body: bodyHeight,
            },
            typography: theme => {
                const color = theme('colors.gray.100')
                return {
                    DEFAULT: {
                        css: {
                            color,
                            'h1,h2,h3,h4,h5,h6': {
                                color,
                            },
                            'ol > li::before': {
                                color,
                            },
                            'a,strong,thead,blockquote': {
                                color,
                            },
                            'a code': {
                                color,
                            },
                            pre: false,
                            code: false,
                            'pre code': false,
                            'code::before': false,
                            'code::after': false,
                        },
                    },
                }
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
