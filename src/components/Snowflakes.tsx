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
    const x_vals = range(0, window.innerWidth)
    const min_dim = Math.min(window.innerWidth, window.innerHeight)
    const max_dim = Math.max(window.innerWidth, window.innerHeight)
    const num_x = x_vals.length * (min_dim / (max_dim * 10))
    const xs = Array.from({ length: num_x }, () => getRandom(x_vals))
    const offsets = range(
        -window.innerHeight * (min_dim / (max_dim * 2)),
        window.innerHeight
    )

    return (
        <div className='w-screen h-content inset-0 absolute -z-20 overflow-hidden'>
            {xs.map((x, i) => {
                const width = getRandom(widths)
                const offset = getRandom(offsets)
                return (
                    <div
                        className='wind'
                        style={{
                            animationDelay: `${Math.floor(3 * Math.random())}s`,
                            animationDuration: `${
                                Math.floor(4 * Math.random()) + 9
                            }s`,
                        }}
                    >
                        <SnowflakeSVG
                            style={{
                                left: x,
                                marginTop: `${offset}px`,
                                width: `${width}px`,
                                animationDuration: `${30 / (width / 45)}s`,
                            }}
                            className='snowflake falling'
                            key={i}
                        />
                    </div>
                )
            })}
        </div>
    )
}
