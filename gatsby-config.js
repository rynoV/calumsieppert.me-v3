const path = require('path')
const config = require('./my-config')
// const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    siteMetadata: {
        title: `calumsieppert.me`,
        description: `My personal site`,
        author: `Calum Sieppert`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/posts`,
                ignore: [`**/\.\#*`, `**/*\.pdf`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/images`,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /\.inline\.svg$/,
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-transformer-orga`,
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                postCssPlugins: [
                    require('postcss-import'),
                    require('tailwindcss')(
                        path.resolve('./tailwind.config.js')
                    ),
                    require('autoprefixer'),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-purgecss`,
            options: {
                printRejected: false,
                develop: false,
                tailwind: true,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [...config.fonts],
                display: 'swap',
            },
        },
    ],
}
