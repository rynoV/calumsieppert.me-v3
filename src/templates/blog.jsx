import React from 'react'
import { graphql } from 'gatsby'

export default function Blog({ data }) {
  const { orgContent } = data
  const { id, html, metadata } = orgContent
  return (
    <>
      <h1 className='uppercase'>{metadata.title}</h1>
      <div key={id} dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  )
}

export const query = graphql`
  query blogPost($id: String!) {
    orgContent(id: { eq: $id }) {
      id
      html
      metadata {
        title
      }
    }
  }
`
