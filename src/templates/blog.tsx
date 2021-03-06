import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'

import { Layout } from '../components/Layout'
import { postsPathPrefix } from '../utils/globals'

import '../katex/copyTex'

import 'katex/dist/katex.min.css'
import '../katex/copy-tex.css'
import './prism-nord.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './blog.css'
import { formatBlogDate } from '../utils/date'
import { BlogPostQuery } from '../../@types/generated'

interface Props extends PageProps {
    data: BlogPostQuery
}

export default function Blog({ data, location }: Props) {
    const { markdownRemark, site } = data
    const {
        html,
        frontmatter,
        tableOfContents,
        timeToRead,
        excerpt,
    } = markdownRemark
    const date = formatBlogDate(frontmatter.date)
    const categoryPath = location.pathname
        .split('/')
        .filter((dirName) => dirName !== postsPathPrefix && dirName !== '')
        .slice(0, -1)
        .join(' / ')

    return (
        <Layout
            title={frontmatter.title}
            description={excerpt}
            currentPath={location.pathname}
            isBlogPost={true}
            postData={markdownRemark}
            postImage={null}
        >
            <article className='prose mb-20'>
                <header className=''>
                    <span className='opacity-75'>{categoryPath}</span>
                    <h1 className=''>{frontmatter.title}</h1>
                    <div className='opacity-75'>
                        <address>
                            By{' '}
                            <Link className='' rel='author' to='/'>
                                Calum Sieppert
                            </Link>
                        </address>
                        <div>
                            <time className='' dateTime={date}>
                                {date}
                            </time>{' '}
                            | <span>{timeToRead} min read</span>
                        </div>
                    </div>
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
                <p className='italic border border-primary p-5 rounded'>
                    Feel free to{' '}
                    <a href={`mailto:${site.siteMetadata.authorEmail}`}>
                        send me an email
                    </a>{' '}
                    or{' '}
                    <a href={site.siteMetadata.authorLinkedIn}>
                        connect with me on LinkedIn
                    </a>
                    .
                </p>
            </article>
        </Layout>
    )
}

export const query = graphql`
    query BlogPost($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            tableOfContents
            frontmatter {
                title
                date
            }
            timeToRead
            excerpt
        }
        site {
            siteMetadata {
                authorEmail
                authorLinkedIn
            }
        }
    }
`
