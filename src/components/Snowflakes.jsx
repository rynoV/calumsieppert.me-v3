import React from 'react'

import SnowflakeSVG from '../../images/snowflake.inline.svg'

import './snowflakes.css'

function range(start, end, step = 1) {
  let a = []
  for (let i = start; i <= end; i += step) {
    a.push(i)
  }
  return a
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function Snowflakes() {
  if (!window) {
    return null
  }

  const min_w = 10
  const max_w = 20
  const widths = range(min_w, max_w)
  const x_vals = range(
    0,
    window.innerWidth,
    Math.floor(window.innerWidth / (max_w - min_w / 5))
  )

  return (
    <div className='w-screen h-content inset-0 absolute -z-20 overflow-hidden'>
      {x_vals.map((x, i) => {
        const width = getRandom(widths)
        return (
          <SnowflakeSVG
            style={{
              left: x,
              width: `${width}px`,
              animationDuration: `${15 / (width / 45)}s`,
              animationDelay: `${Math.floor(Math.random() * 30)}s`,
            }}
            className='snowflake falling'
            key={i}
          />
        )
      })}
    </div>
  )
}
