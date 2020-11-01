import React from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { postsPathPrefix } from '../utils/globals.js'

import '../katex/copyTex'

import 'katex/dist/katex.min.css'
import '../katex/copy-tex.css'
import './prism-nord.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './blog.css'

export default function Blog({ data, location }) {
    const { markdownRemark } = data
    const { html, frontmatter, tableOfContents } = markdownRemark
    const categoryPath = location.pathname
        .split('/')
        .filter(dirName => dirName !== postsPathPrefix && dirName !== '')
        .slice(0, -1)
        .join(' / ')
    return (
        <Layout title={frontmatter.title} currentPath={location.pathname}>
            <article className='prose'>
                <header className=''>
                    <span className=''>{categoryPath}</span>
                    <h1 className=''>{frontmatter.title}</h1>
                    <address className=''>
                        By{' '}
                        <Link className='' rel='author' to='/'>
                            Calum Sieppert
                        </Link>
                    </address>
                    <time className='' dateTime={frontmatter.date}>
                        {frontmatter.date}
                    </time>
                </header>
                <details className='my-3'>
                    <summary className='text-lg font-bold underline'>
                        Table of Contents
                    </summary>
                    <div
                        dangerouslySetInnerHTML={{ __html: tableOfContents }}
                    ></div>
                </details>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
        </Layout>
    )
}

export const query = graphql`
    query mdblogPost($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            tableOfContents
            frontmatter {
                title
                date
            }
        }
    }
`
