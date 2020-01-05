import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { File } from './File'

export function ChronListing() {
  const data = useStaticQuery(graphql`
    {
      allOrgContent(sort: { fields: metadata___date, order: DESC }) {
        edges {
          node {
            fields {
              date
              slug
              title
            }
          }
        }
      }
    }
  `)

  return data.allOrgContent.edges.map(({ node: { fields } }) => {
    return (
      <File
        key={fields.slug}
        title={fields.title}
        date={fields.date}
        slug={fields.slug}
      />
    )
  })
}
