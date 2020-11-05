const path = require('path')
const config = require('./my-config')
// const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    siteMetadata: {
        title: `Calum Sieppert`,
        description: `Personal website of Calum Sieppert.`,
        author: `Calum Sieppert`,
        siteUrl: `https://calumsieppert.me/`,
        authorEmail: `sieppertcalum@gmail.com`,
        image: `/logo.jpg`,
        organization: {
            name: 'Calum Sieppert',
            url: 'https://calumsieppert.me/',
            logo: '/logo.jpg',
        },
        authorLinkedIn: `https://www.linkedin.com/in/calum-sieppert/`,
        authorGitHub: `https://github.com/rynoV/`,
    },
    plugins: [
        `gatsby-plugin-netlify`,
        `gatsby-plugin-advanced-sitemap`,
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
                name: `calumsieppert.me`,
                short_name: `calumsieppert`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-graphql-codegen`,
            options: {
                documentPaths: [
                    `./src/**/*.{ts,tsx,js,jsx}`,
                    `./gatsby-node.esm.js`,
                    `./.cache/fragments/*.js`,
                    `./node_modules/gatsby-transformer-sharp/**/*.js`,
                ],
                fileName: `./@types/generated.ts`,
            },
        },
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
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [...config.fonts],
                display: 'swap',
            },
        },
        `gatsby-plugin-catch-links`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-rewrite-relative-links`,
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            // Open markdown links in a new tab
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        },
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            isIconAfterHeader: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-katex`,
                        options: {
                            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            showLineNumbers: false,
                        },
                    },
                    `gatsby-remark-smartypants`,
                    `gatsby-remark-check-links`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590,
                        },
                    },
                ],
            },
        },
    ],
}
