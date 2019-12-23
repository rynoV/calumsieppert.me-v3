import React from 'react'
import { Link } from 'gatsby'

import { SEO } from './SEO'
import '../utils/globals.css'

export function Layout({ children, title, currentPath }) {
  return (
    <div className='relative max-w-3xl m-auto'>
      <SEO title={title} />
      <nav className='flex justify-end mb-4 opacity-75 sticky top-0'>
        <NavLink currentPath={currentPath} to='/'>
          Home
        </NavLink>
        <NavLink currentPath={currentPath} to='/posts'>
          Posts
        </NavLink>
      </nav>
      <main className='px-4 min-h-full'>{children}</main>
    </div>
  )
}

function NavLink({ to, children, currentPath }) {
  return (
    <Link
      to={to}
      className={`px-6 py-4 no-underline text-gray-300 visited:text-gray-300  border-primary focus:bg-gray-800 hover:bg-gray-800 ${
        currentPath === to ? 'border-b-2' : ''
      }`}
    >
      {children}
    </Link>
  )
}
