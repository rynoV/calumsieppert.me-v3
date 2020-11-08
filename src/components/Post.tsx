import React from 'react'
import { graphql, Link } from 'gatsby'

import { formatBlogDate } from '../utils/date'
import { PostDataFragment } from '../../@types/generated'

export interface Props {
    slug: PostDataFragment['fields']['slug']
    title: PostDataFragment['frontmatter']['title']
    date: PostDataFragment['frontmatter']['date']
    excerpt: PostDataFragment['excerpt']
}

export const PostOverview: React.FC<Props> = function ({
    title,
    slug,
    date,
    excerpt,
}) {
    return (
        <div className='ml-6 my-2' key={slug}>
            <Link to={slug} className='block capitalize text-xl' key={slug}>
                {title}
            </Link>
            <span className='text-gray-400 text-sm'>
                {formatBlogDate(date)}
            </span>
            <div
                dangerouslySetInnerHTML={{ __html: excerpt }}
                className='italic'
            />
        </div>
    )
}

export const query = graphql`
    fragment PostData on MarkdownRemark {
        fields {
            slug
        }
        frontmatter {
            title
            date
        }
        excerpt(format: HTML)
    }
`
