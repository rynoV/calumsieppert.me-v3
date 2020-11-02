import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { File } from './File'

export function ChronListing() {
    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                filter: { fields: { isBlogPost: { eq: true } } }
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            date
                            title
                        }
                        excerpt
                    }
                }
            }
        }
    `)

    return data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, excerpt } }) => {
            return (
                <File
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
