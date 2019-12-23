import React from 'react'

import { Layout } from '../components/Layout'
import { BlogListing } from '../components/BlogListing'

export default function IndexPage({ location }) {
  return (
    <Layout title='Posts' currentPath={location.pathname}>
      <header className='uppercase text-gray-400'>All posts:</header>
      <BlogListing />
    </Layout>
  )
}
