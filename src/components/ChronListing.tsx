import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { PostOverview } from './Post'

export const ChronListing: React.FC = function () {
    const data = useStaticQuery(graphql`
        query ChronListing {
            allMarkdownRemark(
                filter: { fields: { isBlogPost: { eq: true } } }
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                edges {
                    node {
                        ...PostData
                    }
                }
            }
        }
    `)

    return data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt } }) => {
            return (
                <PostOverview
                    key={fields.slug}
                    title={frontmatter.title}
                    date={frontmatter.date}
                    slug={fields.slug}
                    excerpt={excerpt}
                />
            )
        }
    )
}
