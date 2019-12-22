import React from 'react'

import { Layout } from '../components/Layout'

export default function IndexPage({ location }) {
  return (
    <Layout title='Home' currentPath={location.pathname}>
      <h1 className='text-gray-100 text-3xl'>Hello!</h1>
      <p className='text-gray-300'>
        My name is Calum and this is my personal website.
      </p>
      <CabinScene />
    </Layout>
  )
}
