import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { postsPathPrefix } from '../utils/globals.js'

export default function Blog({ data, location }) {
  const { orgContent } = data
  const { html, fields } = orgContent
  const categoryPath = location.pathname
    .split('/')
    .filter(dirName => dirName !== postsPathPrefix && dirName !== '')
    .slice(0, -1)
    .join(' / ')
  return (
    <Layout title={fields.title} currentPath={location.pathname}>
      <header className='mb-6'>
        <span className='text-xs text-gray-600'>{categoryPath}</span>
        <h1 className='capitalize text-3xl'>{fields.title}</h1>
        <address className='text-gray-700 not-italic'>
          By{' '}
          <a
            className='capitalize no-underline hover:underline focus:underline'
            rel='author'
            href={fields.author.link}
          >
            {fields.author.name}
          </a>
        </address>
        <time className='text-gray-600 text-xs' dateTime={fields.date}>
          {fields.date}
        </time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </Layout>
  )
}

export const query = graphql`
  query blogPost($id: String!) {
    orgContent(id: { eq: $id }) {
      id
      html
      fields {
        title
        date
        author {
          name
          link
        }
      }
    }
  }
`
