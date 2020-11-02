import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from './SchemaOrg'

export function SEO({ postData, postImage, isBlogPost, currentPath }) {
    const {
        site: { siteMetadata: seo },
    } = useStaticQuery(graphql`
        {
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
    const description =
        postMeta.description || postData?.excerpt || seo.description
    const image = postImage ? `${seo.siteUrl}${postImage}` : seo.image
    const url = currentPath
    const datePublished = isBlogPost ? postMeta.date : false

    return (
        <React.Fragment>
            <Helmet titleTemplate={`%s | ${seo.title}`}>
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

SEO.propTypes = {
    isBlogPost: PropTypes.bool,
    postData: PropTypes.shape({
        frontmatter: PropTypes.any,
        excerpt: PropTypes.any,
    }),
    postImage: PropTypes.string,
    currentPath: PropTypes.string,
}

SEO.defaultProps = {
    isBlogPost: false,
    postData: {},
    postImage: null,
}
