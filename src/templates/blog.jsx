import React from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { postsPathPrefix } from '../utils/globals.js'

import 'katex/dist/katex.min.css'
import './prism-nord.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './blog.css'

export default function Blog({ data, location }) {
    const { markdownRemark } = data
    const { html, frontmatter } = markdownRemark
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
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
        </Layout>
        // <Layout title={frontmatter.title} currentPath={location.pathname}>
        //     <header className='mb-6'>
        //         <span className='text-xs text-gray-400'>{categoryPath}</span>
        //         <h1 className='capitalize text-3xl'>{frontmatter.title}</h1>
        //         <address className='text-gray-300 not-italic'>
        //             By{' '}
        //             <Link
        //                 className='capitalize hover:underline focus:underline'
        //                 rel='author'
        //                 to='/'
        //             >
        //                 Calum Sieppert
        //             </Link>
        //         </address>
        //         <time
        //             className='text-gray-400 text-xs'
        //             dateTime={frontmatter.date}
        //         >
        //             {frontmatter.date}
        //         </time>
        //     </header>
        //     <div dangerouslySetInnerHTML={{ __html: html }}></div>
        // </Layout>
    )
}

export const query = graphql`
    query mdblogPost($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                date
            }
        }
    }
`
