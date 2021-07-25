import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { PostOverview } from './Post'
import { ChronListingQuery } from '../../@types/generated'

export const ChronListing: React.FC = function () {
    const data: ChronListingQuery = useStaticQuery(graphql`
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

    const postOverviews = data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt, parent } }) => {
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
    return <>{postOverviews}</>
}
