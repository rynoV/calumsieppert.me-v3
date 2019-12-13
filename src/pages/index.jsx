import React from 'react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { BlogListing } from '../components/BlogListing'

export default function IndexPage() {
  return (
    <Layout>
      <SEO title='Home' />
      <h1>Home</h1>
      <BlogListing />
    </Layout>
  )
}
