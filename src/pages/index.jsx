import React from 'react'

import { Layout } from '../components/Layout'

export default function IndexPage({ location }) {
  return (
    <Layout title='Home' currentPath={location.pathname}>
      <h1 className='text-3xl text-gray-900'>Hello!</h1>
      <p className='text-gray-700'>
        My name is Calum and this is my personal website.
      </p>
    </Layout>
  )
}
