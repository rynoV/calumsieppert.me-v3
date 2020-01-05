import React from 'react'
import { Link } from 'gatsby'

export function File({ title, slug, date }) {
  return (
    <div className='ml-6 my-2' key={slug}>
      <Link to={slug} className='block capitalize text-xl' key={slug}>
        {title}
      </Link>
      <span className='text-gray-400 text-sm'>{date}</span>
    </div>
  )
}
