import React from 'react'

import { Layout } from '../components/Layout'
import { CabinScene } from '../components/CabinScene'

import GithubIcon from '../../images/github.inline.svg'
import LinkedInIcon from '../../images/linkedin.inline.svg'

export default function IndexPage({ location }) {
  const iconClasses = 'w-8 fill-current'
  const linkClasses = 'mx-3 first:ml-0 text-gray-100 visited:text-gray-100'

  return (
    <Layout title='Home' currentPath={location.pathname}>
      <h1 className='text-gray-100 text-3xl sm:text-4xl'>Hello!</h1>
      <p className='text-gray-300 sm:text-lg'>
        My name is Calum and this is my personal website.
      </p>
      <div className='flex my-3'>
        <a className={linkClasses} href='https://github.com/rynoV/'>
          <GithubIcon className={iconClasses} />
        </a>
        <a
          className={linkClasses}
          href='https://www.linkedin.com/in/calum-sieppert-20738418b/'
        >
          <LinkedInIcon className={iconClasses} />
        </a>
      </div>
      <CabinScene />
    </Layout>
  )
}
