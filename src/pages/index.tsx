import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { CabinScene } from '../components/CabinScene'

import GithubIcon from '../../images/github.inline.svg'
import LinkedInIcon from '../../images/linkedin.inline.svg'

export default function IndexPage({ location, data }) {
    const {
        site: { siteMetadata },
    } = data
    const iconClasses = 'w-8 fill-current'
    const linkClasses =
        'mx-3 first:ml-0 text-gray-100 visited:text-gray-100 transform hover:scale-110 duration-200'

    return (
        <Layout title='Home' currentPath={location.pathname}>
            <h1 className='text-gray-100 text-3xl sm:text-4xl'>Hello!</h1>
            <p className='text-gray-300 sm:text-lg'>
                My name is Calum Sieppert and this is my personal website.
            </p>
            <div className='flex my-3'>
                <a
                    className={linkClasses}
                    href={siteMetadata.authorGitHub}
                    aria-label='GitHub Icon'
                >
                    <GithubIcon className={iconClasses} alt='GitHub Icon' />
                </a>
                <a
                    className={linkClasses}
                    href={siteMetadata.authorLinkedIn}
                    aria-label='LinkedIn Icon'
                >
                    <LinkedInIcon className={iconClasses} alt='LinkedIn Icon' />
                </a>
            </div>
            <CabinScene />
        </Layout>
    )
}

export const query = graphql`
    query Home {
        site {
            siteMetadata {
                authorLinkedIn
                authorGitHub
            }
        }
    }
`
