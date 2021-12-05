/** Based on https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/master/src/components/SEO/SEO.js */
import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { SEO } from './SEO'
import '../utils/globals.css'
import Image from 'gatsby-image'

const linkClasses =
    'h-full px-6 py-4 no-underline text-gray-100 visited:text-gray-100 border-primary focus:bg-gray-600 hover:bg-gray-600 duration-150 transition-colors'

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
    const [menuExpanded, setMenuExpanded] = useState(false)

    const navLinks = [
        <NavLink currentPath={currentPath} to='/' key='/'>
            Home
        </NavLink>,
        <NavLink currentPath={currentPath} to='/projects' key='/projects'>
            Projects
        </NavLink>,
        <a href='/calum_sieppert_resume.pdf' className={linkClasses}>Resume</a>,
        <NavLink currentPath={currentPath} to='/posts' key='/posts'>
            Posts
        </NavLink>,
    ]

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
            <nav>
                <div
                    className={`bg-primary flex items-center h-nav justify-between opacity-75 sticky top-0 z-10 ${xpad}`}
                >
                    <Image
                        className='w-40'
                        fluid={data?.file?.childImageSharp?.fluid}
                        alt='Logo'
                    />
                    {/* Mid and larger screen show nav links normally */}
                    <div className='hidden h-full md:flex items-center'>
                        {navLinks}
                    </div>
                    {/* Small screen show hamburger */}
                    <div className='md:hidden flex items-center'>
                        <button
                            className='outline-none'
                            onClick={_ => setMenuExpanded(prev => !prev)}
                        >
                            <Hamburger />
                        </button>
                    </div>
                </div>
                {menuExpanded && (
                    <div
                        className={`absolute bg-primary z-10 w-full bg-opacity-95`}
                    >
                        <ul className=''>
                            {navLinks.map(navLink => (
                                <li
                                    className={`block text-sm px-2 py-4 text-white font-semibold`}
                                    key={navLink.key}
                                >
                                    {navLink}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
            <main className={`${xpad} pt-4 min-h-body`}>{children}</main>
        </div>
    )
}

function Hamburger() {
    return (
        <svg
            className='w-6 h-6 text-gray-500'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
        >
            <path d='M4 6h16M4 12h16M4 18h16'></path>
        </svg>
    )
}

function NavLink({ to, children, currentPath }) {
    return (
        <Link
            to={to}
            className={`${linkClasses} ${
                currentPath === to ? 'border-b-2' : ''
            }`}
        >
            {children}
        </Link>
    )
}
