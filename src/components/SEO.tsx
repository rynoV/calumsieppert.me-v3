import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import SchemaOrg from './SchemaOrg'
import { MarkdownRemarkFrontmatter } from '../../@types/generated'

interface Props {
    postData: {
        frontmatter: MarkdownRemarkFrontmatter
        excerpt: string
    }
    postImage: string
    isBlogPost: boolean
    currentPath: string
}

export const SEO: React.FC<Props> = function ({
    postData = {},
    postImage = null,
    isBlogPost = false,
    currentPath,
}) {
    const {
        site: { siteMetadata: seo },
    } = useStaticQuery(graphql`
        query SEO {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                    image
                    author
                    authorEmail
                    organization {
                        name
                        url
                        logo
                    }
                }
            }
        }
    `)
    const postMeta = postData?.frontmatter || {}

    const title = postMeta.title || seo.title
    const description = postData?.excerpt || seo.description
    const image = postImage ? `${seo.siteUrl}${postImage}` : seo.image
    const url = `${seo.siteUrl}${currentPath}`
    const datePublished = isBlogPost ? postMeta.date : ''

    return (
        <React.Fragment>
            <Helmet
                titleTemplate={`%s | ${seo.title}`}
                htmlAttributes={{
                    lang: 'en',
                }}
            >
                {/* General tags */}
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='image' content={image} />
                <link rel='canonical' href={url} />

                {/* OpenGraph tags */}
                <meta property='og:url' content={url} />
                {isBlogPost ? (
                    <meta property='og:type' content='article' />
                ) : null}
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image' content={image} />

                {/* Twitter Card tags */}
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:creator' content={seo.author} />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:image' content={image} />
            </Helmet>
            <SchemaOrg
                isBlogPost={isBlogPost}
                url={url}
                title={title}
                image={image}
                description={description}
                datePublished={datePublished}
                siteUrl={seo.siteUrl}
                author={seo.author}
                organization={seo.organization}
                defaultTitle={seo.title}
            />
        </React.Fragment>
    )
}
