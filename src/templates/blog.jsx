import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'

export default function Blog({ data, location }) {
  const { orgContent } = data
  const { id, html, metadata } = orgContent
  return (
    <Layout title={metadata.title} currentPath={location.pathname}>
      <header className='uppercase'>{metadata.title}</header>
      <div key={id} dangerouslySetInnerHTML={{ __html: html }}></div>
    </Layout>
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
