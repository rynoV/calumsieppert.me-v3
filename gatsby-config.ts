import { GatsbyConfig } from 'gatsby'
import path from 'path'
import { config } from './my-config'
const authorGitHubUsername = `rynoV`
// const isProd = process.env.NODE_ENV === 'production'

require('dotenv').config({
    path: `.env`,
})

const gatsbyConfig: GatsbyConfig = {
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
        authorGitHubUsername,
        authorGitHub: `https://github.com/${authorGitHubUsername}/`,
        authorTwitter: `https://twitter.com/CalumSieppert`,
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
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `calumsieppert.me`,
                short_name: `calumsieppert`,
                start_url: `/`,
                background_color: config.bgColour,
                theme_color: config.bgColour,
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
                    `./gatsby-node.ts`,
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
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590,
                        },
                    },
                    `gatsby-remark-copy-relative-linked-files`,
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
                ],
            },
        },
    ],
}

export default gatsbyConfig
