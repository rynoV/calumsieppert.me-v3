/** Based on https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/master/src/components/SEO/SEO.js */
import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { SEO } from './SEO'
import '../utils/globals.css'
import Image from 'gatsby-image'

export function Layout({
    children,
    currentPath,
    title,
    description = '',
    postData = null,
    postImage = null,
    isBlogPost = false,
}) {
    const data = useStaticQuery(
        graphql`
            query Layout {
                file(relativePath: { eq: "logo.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        `
    )

    const xpad = 'px-4'

    return (
        <div className='relative max-w-3xl m-auto'>
            <SEO
                {...{
                    title,
                    description,
                    currentPath,
                    isBlogPost,
                    postData,
                    postImage,
                }}
            />
            <nav
                className={`bg-primary flex items-center h-nav justify-between opacity-75 sticky top-0 z-10 ${xpad}`}
            >
                <Image
                    className='w-40'
                    fluid={data?.file?.childImageSharp?.fluid}
                    alt='Logo'
                />
                <div>
                    <NavLink currentPath={currentPath} to='/'>
                        Home
                    </NavLink>
                    <NavLink currentPath={currentPath} to='/posts'>
                        Posts
                    </NavLink>
                </div>
            </nav>
            <main className={`${xpad} pt-4 min-h-body`}>{children}</main>
        </div>
    )
}

function NavLink({ to, children, currentPath }) {
    return (
        <Link
            to={to}
            className={`h-full px-6 py-4 no-underline text-gray-100 visited:text-gray-100 border-primary focus:bg-gray-800 hover:bg-gray-800 ${
                currentPath === to ? 'border-b-2' : ''
            }`}
        >
            {children}
        </Link>
    )
}
